import { motion } from "framer-motion";
import { Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function YouTubePage() {
  const youtubeUrl = "https://www.youtube.com/@example"; // Placeholder URL

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="p-4 bg-red-600 rounded-2xl shadow-lg shadow-red-600/20">
            <Youtube className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            OUR <span className="text-red-600">YOUTUBE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to our channel to see our robot reveals, match highlights, and behind-the-scenes engineering vlogs.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-secondary/30 border-red-600/20 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Connect With Us</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8 pt-6">
              <div className="p-6 bg-white rounded-xl shadow-xl">
                <QRCodeSVG value={youtubeUrl} size={200} level="H" includeMargin={true} />
              </div>

              <div className="space-y-6 w-full text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Scan to Subscribe</h3>
                  <p className="text-sm text-muted-foreground">
                    Point your camera at the QR code to open our YouTube channel directly on your device.
                  </p>
                </div>

                <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold gap-2">
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                    Visit YouTube Channel
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
