"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import anime from "animejs"

export function PageLoader() {
  const pathname = usePathname()
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    const loader = loaderRef.current
    const progress = progressRef.current
    const label = labelRef.current
    if (!loader || !progress || !label) return

    const enter = firstRender.current
    firstRender.current = false
    label.textContent = enter ? "INITIALIZING" : "ROUTING"

    anime.remove([loader, progress, label])
    anime.set(loader, { opacity: 1, pointerEvents: "auto" })
    anime.set(progress, { scaleX: 0, transformOrigin: "left center" })

    const timeline = anime.timeline({
      easing: "easeInOutQuart",
      complete: () => {
        anime({
          targets: loader,
          opacity: 0,
          duration: 500,
          easing: "easeOutQuad",
          complete: () => {
            loader.style.pointerEvents = "none"
          },
        })
      },
    })

    timeline
      .add({ targets: label, opacity: [0, 1], translateY: [8, 0], duration: 300 })
      .add({ targets: progress, scaleX: [0, 1], duration: enter ? 950 : 650 }, "-=100")
      .add({ targets: label, opacity: [1, 0], translateY: [0, -8], duration: 260 }, "-=120")

    return () => timeline.pause()
  }, [pathname])

  return (
    <div ref={loaderRef} className="page-loader" aria-hidden="true">
      <div className="page-loader__grid" />
      <div className="page-loader__center">
        <div className="page-loader__orbit page-loader__orbit--one" />
        <div className="page-loader__orbit page-loader__orbit--two" />
        <span className="page-loader__core" />
        <span ref={labelRef} className="page-loader__label">INITIALIZING</span>
        <div className="page-loader__track"><div ref={progressRef} className="page-loader__progress" /></div>
      </div>
    </div>
  )
}
