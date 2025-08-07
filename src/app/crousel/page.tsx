"use client";
import React, { useState } from "react";
import Crousel from "@/components/crousel";
import CrouselButton from "@/components/crousel-button";
const page = () => {
  const images = [
    "https://fastly.picsum.photos/id/1015/600/300.jpg?hmac=_2Ho9FLQHp9gYSt4GA6k2-WraxJepChcDezstPSy4Zo",
    "https://fastly.picsum.photos/id/1016/600/300.jpg?hmac=8slUgBXoQEdnlb__JU6KT4omFLVGympVHt9PsV4yByg",
    "https://fastly.picsum.photos/id/1018/600/300.jpg?hmac=0hh-R3HUJVhnWU9SZGbUZ80J1Djs3EZLwPdpfmHY8Pk",
  ];
  const [current, setCurrent] = useState(0);
  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="container mx-auto flex flex-col items-center mt-5">
      <Crousel current={current} images={images} />
      <span>
        {current + 1} / {images.length}
      </span>
      <CrouselButton handlePrevious={handlePrevious} handleNext={handleNext} />
    </div>
  );
};

export default page;
