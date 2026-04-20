import Image from "next/image";
import type { SiteImage } from "@/lib/site-images";

type ImagePanelProps = {
  image: SiteImage;
  aspect?: "landscape" | "portrait" | "square" | "wide";
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

const aspectClassNames = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/9]"
};

export default function ImagePanel({
  image,
  aspect = "landscape",
  priority = false,
  className,
  imageClassName,
  overlayClassName
}: ImagePanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] ${aspectClassNames[aspect]} ${className ?? ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover ${imageClassName ?? ""}`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent ${overlayClassName ?? ""}`}
      />
    </div>
  );
}
