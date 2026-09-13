import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Arts", href: "/arts" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Crafts", href: "/crafts" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/TriffyArt", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/psalmsalcedo/", icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com/triffyArts", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/Triffy_22", icon: Instagram },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <span className="eyebrow">TRIFFY ARTS / CREATIVE ARTIST</span>
          <h2>Make something<br /><em>meaningful.</em></h2>
          <p>Digital art, design, and creative storytelling from Legazpi, Albay.</p>
          <div className="site-footer__contact">
            <a href="mailto:businesspsalmsalcedo@gmail.com"><Mail size={15} /> businesspsalmsalcedo@gmail.com</a>
            <span><MapPin size={15} /> Legazpi, Albay PH</span>
          </div>
        </div>

        <div className="site-footer__column">
          <span className="eyebrow">NAVIGATE</span>
          <nav aria-label="Footer navigation">
            {navigationLinks.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}<ArrowUpRight size={13} /></Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__column">
          <span className="eyebrow">CONNECT</span>
          <div className="site-footer__socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} key={label}>
                <Icon size={17} />
                <span>{label}</span>
              </a>
            ))}
          </div>
          <Link className="site-footer__brief" href="/contact">Start a project <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Psalm Salcedo</span><span>Created by Psalm Salcedo</span></div>
    </footer>
  )
}
