/* eslint-disable @next/next/no-img-element */
import { AlbumType } from "@/shared/albums";
import Image from "next/image";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

import styles from "./Album.module.scss";

export interface AlbumProps extends AlbumType {
  onClick?: () => void;
  onCoverFlowClick?: () => void;
  onFullScreenClick?: () => void;
}

import cnBind from "classnames/bind";
import { Button } from "@nextui-org/button";
const cx = cnBind.bind(styles);

export const Album = ({
  imageSrc,
  album,
  releasedAt,
  band,
  onClick,
  onCoverFlowClick,
  onFullScreenClick,
  link,
}: AlbumProps) => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    VanillaTilt.init(imageRef.current as HTMLElement, {
      max: 16,
      speed: 1000,
      scale: 1.5,
      glare: true,
      "max-glare": 0.4,
    });
  }, []);

  return (
    <div ref={imageRef} className={styles.album} onClick={onClick}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={album}
        width={400}
        height={400}
        title={`${band}  ·  ${album}  ·  ${releasedAt.getFullYear()}`}
      />
      <div className={cx("bottom-block")}>
        {link && (
          <a className={cx("link")} href={link} target="_blank" rel="noopener">
            <img src="apple-music.png" alt="apple music" />
          </a>
        )}
        <Button
          isIconOnly
          className={cx("button", "carousel-button")}
          onClick={(e) => {
            e.stopPropagation();
            onCoverFlowClick?.();
          }}
        >
          <span className={cx("material-symbols-outlined", "carousel-icon")}>
            view_carousel
          </span>
        </Button>
        <Button
          isIconOnly
          className={cx("button", "carousel-button")}
          onClick={(e) => {
            e.stopPropagation();
            onFullScreenClick?.();
          }}
        >
          <span className="material-symbols-outlined">fullscreen</span>
        </Button>
      </div>
    </div>
  );
};
