import type { Metadata } from "next"
import { getFeaturedWorks, readPortfolioFolders } from "@/lib/portfolio-data"
import { HomeCommandCenter } from "@/components/home-command-center"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Psalm Salcedo\'s portfolio. Creative artist and designer crafting beautiful digital experiences through art, design, and creative storytelling.',
}

// Refresh on every request so admin-marked "featured" posts show up immediately.
export const dynamic = "force-dynamic"

const fallbackFeaturedWorks = [
  {
    id: "1",
    image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Welcome2025.gif",
    title: "Welcome 2025",
    category: "Pixel Art",
    href: "/arts?id=1",
  },
  {
    id: "2",
    image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Pizza.gif",
    title: "Cheesy Pizza",
    category: "Pixel Art",
    href: "/arts?id=2",
  },
  {
    id: "3",
    image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/robotik.gif",
    title: "Robotik",
    category: "Pixel Art",
    href: "/arts?id=3",
  },
]



export default async function HomePage() {
  const folders = await readPortfolioFolders().catch(() => [])
  const remoteFeaturedWorks = getFeaturedWorks(folders)
  const featuredWorks = remoteFeaturedWorks.length > 0 ? remoteFeaturedWorks : fallbackFeaturedWorks
  const artsShowcase = folders
    .filter((folder) => folder.type === "Arts")
    .flatMap((folder) => folder.items)
    .slice(0, 8)
    .map((item) => ({ id: item.id, image: item.image, title: item.title, category: item.category }))
  const graphicDesignShowcase = folders
    .filter((folder) => folder.type === "Graphic Design")
    .flatMap((folder) => [{ id: folder.id, image: folder.preview, title: folder.title, category: folder.category }])
    .slice(0, 8)
  return <HomeCommandCenter featuredWorks={featuredWorks} artsShowcase={artsShowcase} graphicDesignShowcase={graphicDesignShowcase} />
}
