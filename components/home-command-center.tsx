"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import * as THREE from "three"
import { ArrowUpRight, ExternalLink, MailQuestionIcon, Radio, ShieldCheck } from "lucide-react"

type FeaturedWork = {
  id: string
  image: string
  title: string
  category: string
  href: string
}

type ShowcaseWork = {
  id: string
  image: string
  title: string
  category: string
}

const stations = [
  { code: "01", label: "DIGITAL ART", detail: "VISUAL SYSTEMS", href: "/arts" },
  { code: "02", label: "INTERFACE DESIGN", detail: "USER OPERATIONS", href: "/graphic-design" },
  { code: "03", label: "WEB PROJECTS", detail: "LIVE DEPLOYMENTS", href: "/projects" },
  { code: "04", label: "OBJECT STUDIES", detail: "TACTILE WORKS", href: "/crafts" },
]

export function HomeCommandCenter({ featuredWorks, artsShowcase, graphicDesignShowcase }: { featuredWorks: FeaturedWork[]; artsShowcase: ShowcaseWork[]; graphicDesignShowcase: ShowcaseWork[] }) {
  const root = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const liquidCanvas = useRef<HTMLCanvasElement>(null)
  const particleCanvas = useRef<HTMLCanvasElement>(null)
  const readoutVisual = useRef<HTMLDivElement>(null)
  const [showcasePaused, setShowcasePaused] = useState(false)

  const showcaseWorks = [...artsShowcase, ...graphicDesignShowcase]

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".mission-kicker, .mission-title, .mission-copy, .mission-actions", { y: 28, opacity: 0, stagger: 0.1, duration: 0.8 })
        .from(".mission-readout", { x: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".station-card", { y: 24, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.35")

    }, root)

    return () => context.revert()
  }, [])

  useEffect(() => {
    const canvas = liquidCanvas.current
    const target = hero.current
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (!canvas || !target || isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 5.2
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uDark: { value: 1 },
        uPink: { value: new THREE.Color("#f2a7da") },
        uBlue: { value: new THREE.Color("#a9d7f5") },
        uLime: { value: new THREE.Color("#d8f28c") },
        uForest: { value: new THREE.Color("#24553d") },
        uTeal: { value: new THREE.Color("#39a99a") },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 direction = normalize(position);
          float wave = sin(direction.x * 3.0 + direction.y * 1.8 + uTime * 0.22) * 0.11;
          wave += sin(direction.y * 3.5 - direction.z * 2.0 - uTime * 0.18) * 0.085;
          wave += cos((direction.x + direction.z) * 4.0 + uTime * 0.14) * 0.06;
          wave += sin(direction.z * 5.0 - direction.y * 2.0 - uTime * 0.2) * 0.04;
          vec3 displaced = direction * (1.0 + wave);
          vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
          vPosition = worldPosition.xyz;
          vNormal = normalize(normalMatrix * direction);
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uDark;
        uniform vec3 uPink;
        uniform vec3 uBlue;
        uniform vec3 uLime;
        uniform vec3 uForest;
        uniform vec3 uTeal;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 light = normalize(vec3(-0.45, 0.7, 1.0));
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float lighting = max(dot(normal, light), 0.0);
          float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.2);
          float colorFlow = sin(vPosition.y * 2.8 + uTime * 0.3) * 0.5 + 0.5;
          float highlight = pow(max(dot(reflect(-light, normal), viewDirection), 0.0), 18.0);
          vec3 lightColor = mix(uPink, uBlue, colorFlow);
          lightColor = mix(lightColor, vec3(1.0), lighting * 0.38 + highlight * 0.55);
          vec3 darkColor = mix(uForest, uTeal, colorFlow);
          darkColor = mix(darkColor, uLime, lighting * 0.32 + fresnel * 0.24);
          vec3 color = mix(lightColor, darkColor, uDark);
          color += vec3(0.22, 0.3, 0.14) * fresnel * uDark;
          gl_FragColor = vec4(color, mix(0.7, 0.64, uDark) + fresnel * 0.2);
        }
      `,
    })
    const geometry = new THREE.SphereGeometry(1.55, 64, 40)
    const blobLayout = [{ x: 1.2, y: 0.02, scale: 0.96 }]
    const liquidBlobs = blobLayout.map((layout, index) => {
      const blobMaterial = index === 0 ? material : material.clone()
      const blob = new THREE.Mesh(geometry, blobMaterial)
      blob.position.set(layout.x, layout.y, index * -0.08)
      blob.scale.setScalar(layout.scale)
      blob.userData = { baseX: layout.x, baseY: layout.y, baseScale: layout.scale, phase: index * 1.7 }
      scene.add(blob)
      return blob
    })

    const resize = () => {
      const width = target.clientWidth
      const height = target.clientHeight
      if (width < 768) {
        canvas.style.display = "none"
        return
      }
      canvas.style.display = "block"
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      camera.position.x = width < 768 ? 0.28 : 0
      camera.position.y = width < 768 ? 0.04 : 0
      camera.lookAt(0, 0, 0)
    }

    const setTheme = () => {
      const dark = document.documentElement.classList.contains("dark")
      material.uniforms.uDark.value = dark ? 1 : 0
    }

    const clock = new THREE.Clock()
    let animationFrame = 0
    let lastRender = 0
    const frameInterval = 1000 / 50
    const animate = () => {
      const now = performance.now()
      if (window.innerWidth >= 768 && now - lastRender >= frameInterval) {
        const elapsed = clock.getElapsedTime()
        material.uniforms.uTime.value = elapsed
        liquidBlobs.forEach((blob) => {
          const data = blob.userData
          const driftX = Math.sin(elapsed * 0.28 + data.phase) * 0.08
          const driftY = Math.sin(elapsed * 0.34 + data.phase) * 0.14
          const targetX = data.baseX + driftX
          const targetY = data.baseY + driftY
          blob.position.x += (targetX - blob.position.x) * 0.012
          blob.position.y += (targetY - blob.position.y) * 0.012
          const breathing = 1 + Math.sin(elapsed * 0.45 + data.phase) * 0.035
          blob.scale.setScalar(data.baseScale * breathing)
          blob.rotation.y = elapsed * 0.08 + data.phase
          blob.rotation.x = Math.sin(elapsed * 0.12 + data.phase) * 0.08
        })
        renderer.render(scene, camera)
        lastRender = now
      }
      animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    setTheme()
    const themeObserver = new MutationObserver(setTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("resize", resize)
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      themeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      liquidBlobs.forEach((blob, index) => {
        if (index > 0) blob.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const canvas = particleCanvas.current
    const target = hero.current
    if (!canvas || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const context = canvas.getContext("2d")
    if (!context) return

    type Particle = { x: number; y: number; size: number; life: number; speed: number }
    const particles: Particle[] = []
    let animationFrame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      width = target.clientWidth
      height = target.clientHeight
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }

    const addParticles = (event: PointerEvent) => {
      const bounds = target.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      for (let index = 0; index < 4; index += 1) {
        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          size: 1 + Math.random() * 2.5,
          life: 1,
          speed: 0.25 + Math.random() * 0.45,
        })
      }
      if (particles.length > 120) particles.splice(0, particles.length - 120)
    }

    const animate = () => {
      context.clearRect(0, 0, width, height)
      const accent = getComputedStyle(root.current ?? target).getPropertyValue("--mission-lime").trim() || "#c6ed78"
      particles.forEach((particle) => {
        particle.y -= particle.speed
        particle.life -= 0.012
        context.globalAlpha = Math.max(particle.life, 0) * 0.7
        context.fillStyle = accent
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 1
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        if (particles[index].life <= 0) particles.splice(index, 1)
      }
      animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    target.addEventListener("pointermove", addParticles, { passive: true })
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      target.removeEventListener("pointermove", addParticles)
    }
  }, [])

  return (
    <div ref={root} className="mission-control">
      <section ref={hero} className="mission-hero">
        <canvas ref={liquidCanvas} className="mission-liquid-canvas" aria-hidden="true" />
        <canvas ref={particleCanvas} className="mission-particle-canvas" aria-hidden="true" />
        <div className="mission-grid" />
        <div className="mission-hero__inner">
          <div className="mission-copy-block">
            <div className="mission-kicker"><span className="status-dot" /> TRIFFY ARTS // CREATIVE ARTIST</div>
            <h1 className="mission-title">CREATIVE<br /><em>ARTIST</em><em> &</em><br />DESIGNER.</h1>
            <p className="mission-copy">Crafting beautiful digital experiences through art, design, and creative storytelling</p>
            <div className="mission-actions">
              <Link className="mission-button mission-button--primary" href="/projects">ENTER ARCHIVE <ArrowUpRight size={15} /></Link>
              <Link className="mission-button" href="/about">OPEN CHANNEL <Radio size={15} /></Link>
            </div>
          </div>

          <div className="mission-readout" aria-label="Creative operations status">
            <div className="readout-heading"><span>User:</span><span>TriffyArts</span></div>
            <div
              ref={readoutVisual}
              className="readout-visual"
              onPointerMove={(event) => {
                if (event.pointerType === "touch") return
                const bounds = event.currentTarget.getBoundingClientRect()
                const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
                const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
                event.currentTarget.style.setProperty("--photo-x", `${x * 10}px`)
                event.currentTarget.style.setProperty("--photo-y", `${y * 10}px`)
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--photo-x", "0px")
                event.currentTarget.style.setProperty("--photo-y", "0px")
              }}
            >
              <img
                className="readout-photo"
                src="/my-face.jpg?v=2"
                alt="Psalm Salcedo"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = "/CoverPhoto.png"
                }}
              />
              <div className="readout-photo__veil" />
            </div>
            <div className="readout-footer"><span>LEGAZPI / PH</span><span className="readout-live"><span className="status-dot" /> LIVE</span></div>
          </div>
        </div>
        <div className="mission-hero__footer"><span>@Triffy_22</span><span>SCROLL TO NAVIGATE ↓</span></div>
      </section>

      <section className="mission-stations">
        <div className="mission-section-head"><div><span className="eyebrow">AVAILABLE CHANNELS </span><h2>Choose your point<br /><em>of entry.</em></h2></div>
        <p>Each station is a different frequency. Browse the archive, inspect the process, or transmit a brief.</p></div>
        <div className="station-grid">
          {stations.map((station) => (
            <Link href={station.href} className="station-card" key={station.code}>
              <div className="station-card__top"><span>{station.code}</span><ExternalLink size={15} /></div>
              <div><h3>{station.label}</h3><p>{station.detail}</p></div>
              <div className="station-card__line" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mission-featured">
        <div className="mission-section-head mission-section-head--compact"><div><span className="eyebrow">RECENT TRANSMISSIONS</span><h2>Selected <em>signal.</em></h2></div><Link href="/arts" className="text-link">VIEW FULL ARCHIVE <ArrowUpRight size={15} /></Link></div>
        <div className="mission-work-grid">
          {featuredWorks.map((work, index) => (
            <Link href={work.href} className={`mission-work mission-work--${index + 1}`} key={work.id}>
              <img src={work.image} alt={work.title} />
              <div className="mission-work__meta"><span>{work.category}</span><strong>{work.title}</strong></div>
            </Link>
          ))}
        </div>
      </section>

      {showcaseWorks.length > 0 && (
        <section
          className="mission-showcase"
          aria-label="Arts and graphic design showcase"
          onMouseEnter={() => setShowcasePaused(true)}
          onMouseLeave={() => setShowcasePaused(false)}
          onFocus={() => setShowcasePaused(true)}
          onBlur={() => setShowcasePaused(false)}
        >
          <div className="mission-showcase__head">
            <div><span className="eyebrow">ARTS / GRAPHIC DESIGN</span><h2>Moving <em>archive.</em></h2></div>
            <span className="mission-showcase__status">{showcasePaused ? "HOLD" : "AUTO PLAY"} / CONTINUOUS</span>
          </div>
          <div className="mission-showcase__viewport" onMouseEnter={() => setShowcasePaused(true)} onMouseLeave={() => setShowcasePaused(false)}>
            <div className={`mission-showcase__track ${showcasePaused ? "is-paused" : ""}`}>
              {[...showcaseWorks, ...showcaseWorks].map((work, index) => (
                <div className="mission-showcase__slide" key={`${work.id}-${index}`} aria-hidden={index >= showcaseWorks.length}>
                  <img src={work.image} alt={index < showcaseWorks.length ? work.title : ""} />
                  <div className="mission-showcase__wash" />
                  <div className="mission-showcase__meta"><span>{work.category}</span><strong>{work.title}</strong></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mission-cta"><MailQuestionIcon size={30} /><span className="eyebrow">Have Something in Mind?</span><h2>{"Let's Build"}<br /><em>Something Amazing</em></h2><Link className="mission-button mission-button--primary" href="/contact">CONTACT ME <ArrowUpRight size={15} /></Link><div className="mission-cta__seal"><ShieldCheck size={17} /> Created by Psalm Salcedo</div></section>
    </div>
  )
}
