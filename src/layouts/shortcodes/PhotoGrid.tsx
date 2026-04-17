import type { ImageMetadata } from "astro";
import React from "react";

interface Photo {
  src: string | ImageMetadata;
  alt?: string;
  caption?: string;
}

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  const shown = photos.slice(0, 2);
  const isSingle = shown.length === 1;

  return (
    <div
      className={`my-6 grid gap-3 ${isSingle ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {shown.map((photo, i) => {
        const src =
          typeof photo.src === "string" ? photo.src : photo.src.src;
        return (
          <figure key={i} className="m-0">
            <img
              src={src}
              alt={photo.alt ?? ""}
              className="w-full rounded-lg object-cover"
              loading="lazy"
              decoding="async"
            />
            {photo.caption && (
              <figcaption className="mt-1.5 text-center text-xs text-text italic">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
