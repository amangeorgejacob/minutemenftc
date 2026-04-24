import { Link } from "wouter";
import { Mail, Heart } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { useState } from "react";
import { LoginModal } from "./LoginModal";

export function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <footer className="bg-background border-t border-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-foreground">TOTAL CHAOS</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Inspiring the next generation of engineers and innovators through competitive robotics.
              First Tech Challenge Team #24621.
            </p>
            <div className="flex gap-4">
              
              <a href="mailto:amangeorgejacob@gmail.com" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@TotalChaos24621" target="_blank" rel="noopener noreferrer" className="p-2 bg-foreground/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors">
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community Impact</Link></li>
              <li><Link href="/sponsors" className="text-muted-foreground hover:text-primary transition-colors">Sponsors</Link></li>
              <li><Link href="/youtube" className="text-muted-foreground hover:text-primary transition-colors">YouTube</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="font-bold mb-4 text-foreground">Support Us</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              We rely on community support to build robots and compete.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
              Become a Sponsor <Heart className="w-4 h-4" />
            </Link>
          </div> */}
        </div>

        
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Total Chaos #24621. All rights reserved.</p>
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
