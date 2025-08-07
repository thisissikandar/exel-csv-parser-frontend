import React from "react";
interface CrouselProps {
  images: string[];
  current: number;
}

const Crousel = ({ images, current }: CrouselProps) => {
  return (
    <div>
      <img
        src={images[current]}
        alt={`Image ${current + 1}`}
        className="w-full h-auto rounded-lg shadow-md"
      />
    </div>
  );
};

export default Crousel;
