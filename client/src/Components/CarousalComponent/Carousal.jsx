import React from "react";
import styles from "./Carousals.modules.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import carousal1 from "../../Assets/carousal1.jpg";
import carousal2 from "../../Assets/carousal2.jpg";
import desc2 from "../../Assets/desc2.jpg";

const images = [
  // {
  //   original: carousal1,
  //   thumbnail: carousal1,
  // },
  // {
  //   original: carousal2,
  //   thumbnail: carousal2,
  // },
  // {
  //   original: desc2,
  //   thumbnail: desc2,
  // },
];

const CarousalCarosel = ({
  showThumbnails,
  autoPlay,
  thumbnailPosition,
  img,
}) => {
  return (
    <div className="maindiv">
      <ImageGallery
        className="image-gallery-slide"
        items={img ?? images}
        showThumbnails={showThumbnails}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={autoPlay}
        thumbnailPosition={thumbnailPosition}
        disableThumbnailScroll={true}
      />
    </div>
  );
};

export default CarousalCarosel;
