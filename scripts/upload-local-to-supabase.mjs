// One-off migration: uploads a local folder (mirroring Blob's structure) into the
// Supabase "portfolio" bucket. Expects: <root>/folders/*.json and <root>/assets/*.
// Usage: node --env-file=.env.local scripts/upload-local-to-supabase.mjs <root>
import { readdir, readFile } from "node:fs/promises"
import { join, extname } from "node:path"
import { createClient } from "@supabase/supabase-js"

const BUCKET = "portfolio"

const CONTENT_TYPES = {
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`Missing required env var: ${name}`)
    process.exit(1)
  }
  return value
}

const root = process.argv[2]
if (!root) {
  console.error("Usage: node --env-file=.env.local scripts/upload-local-to-supabase.mjs <root-folder>")
  process.exit(1)
}

const supabaseUrl = requireEnv("SUPABASE_URL")
const supabaseKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY")
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function collectFiles(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(join(dir, entry.name), relativePath)))
    } else {
      files.push(relativePath)
    }
  }
  return files
}

async function main() {
  const relativeFiles = await collectFiles(root)
  console.log(`Found ${relativeFiles.length} files under ${root}`)

  let migrated = 0
  let failed = 0

  for (const relativePath of relativeFiles) {
    try {
      const contentType = CONTENT_TYPES[extname(relativePath).toLowerCase()] ?? "application/octet-stream"
      const data = await readFile(join(root, relativePath))

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(relativePath, data, { contentType, upsert: true })
      if (error) throw error

      console.log(`✓ ${relativePath}`)
      migrated++
    } catch (error) {
      console.error(`✗ ${relativePath}:`, error instanceof Error ? error.message : error)
      failed++
    }
  }

  console.log(`\nDone. Uploaded: ${migrated}, Failed: ${failed}`)
  if (failed > 0) process.exitCode = 1
}

main()
