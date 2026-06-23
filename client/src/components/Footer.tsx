import { Link } from "wouter";
import { Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useState } from "react";
import { LoginModal } from "./LoginModal";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/OurMentors", label: "Our Mentors" },
  { href: "/Portfolio", label: "Portfolio" },
  { href: "/SummerOfStem", label: "Summer of STEM" },
  { href: "/StemKits", label: "Minutemen Kits" },
];

const infoLinks = [
  { href: "/Community", label: "Community Impact" },
  { href: "/Sponsors", label: "Sponsors" },
  { href: "/Social", label: "Social Media" },
  { href: "/FAQ", label: "FAQ" },
  { href: "/Contact", label: "Contact Us" },
];

export function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <footer className="bg-background border-t border-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* BRAND */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-foreground">MINUTEMEN</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Inspiring the next generation of engineers and innovators through competitive robotics.
              First Tech Challenge Team #24621.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:lhsftc24621@gmail.com"
                className="p-2 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/minutemen.ftc24621"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/5 rounded-full hover:bg-[#d62976]/20 hover:text-[#d62976] transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="font-bold mb-4 text-foreground uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFO */}
          <div>
            <h4 className="font-bold mb-4 text-foreground uppercase tracking-wider text-sm">Info</h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Minutemen #24621. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">Built with ❤️</p>
            <button
              onClick={() => setLoginOpen(true)}
              className="text-xs text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
            >
              ·
            </button>
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </footer>
  );
}
