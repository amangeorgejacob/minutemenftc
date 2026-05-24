import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

const instagramUrl = "https://www.instagram.com/minutemen.24131?igsh=MW90aWxqMDdpN3k4MA%3D%3D";

export default function SocialMediaPage() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.social ?? true;

  if (!visible && !isAdmin) return <HiddenSection label="Social Media" />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            OUR <span className="text-primary">SOCIAL MEDIA</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow us to stay up to date with our journey, events, and behind-the-scenes content.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Instagram — Active */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <Card className="h-full bg-secondary/30 border-[#d62976]/20 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-[#d62976] rounded-xl shadow-lg shadow-[#d62976]/20">
                  <SiInstagram className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold">Instagram</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-5 pt-4">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <QRCodeSVG value={instagramUrl} size={160} level="H" includeMargin={true} />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Scan or tap to follow us on Instagram.
              </p>
              <Button asChild size="lg" className="w-full bg-[#d62976] hover:bg-[#b5225f] text-white font-bold gap-2">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Follow Us
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* YouTube — Not Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full bg-secondary/20 border-foreground/5 backdrop-blur-sm overflow-hidden opacity-60">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-foreground/10 rounded-xl">
                  <SiYoutube className="w-8 h-8 text-foreground/40" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-foreground/50">YouTube</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pt-4 text-center">
              <div className="w-full py-12 rounded-xl bg-foreground/5 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">🚧</span>
                <p className="text-sm text-muted-foreground font-medium">Not available yet</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Our YouTube channel is coming soon. Check back later!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Facebook — Not Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-secondary/20 border-foreground/5 backdrop-blur-sm overflow-hidden opacity-60">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-foreground/10 rounded-xl">
                  <SiFacebook className="w-8 h-8 text-foreground/40" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-foreground/50">Facebook</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pt-4 text-center">
              <div className="w-full py-12 rounded-xl bg-foreground/5 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">🚧</span>
                <p className="text-sm text-muted-foreground font-medium">Not available yet</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Our Facebook page is coming soon. Check back later!
              </p>
            </CardContent>
          </Card>
        </motion.div>

      </section>

      <AdminVisibilityToggle sectionId="social" visible={visible} label="Social Media page" />
    </div>
  );
}
