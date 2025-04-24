"use client";

import { Instagram, Music2, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/saeshn",
    icon: Instagram,
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/saeshn",
    icon: Music2,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@saeshn",
    icon: Youtube,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/saeshn",
    icon: Twitter,
  },
] as const;

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-6">
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">{link.name}</span>
          <link.icon className="h-6 w-6" />
        </motion.a>
      ))}
    </div>
  );
}
