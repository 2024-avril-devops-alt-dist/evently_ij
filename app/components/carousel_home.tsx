"use client";

//remplacer le svg par celiu de la maquette  mobile

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";

interface OnboardingSlide {
  title: string;
  description: string;
  imageSrc?: string;
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
  onComplete?: () => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ 
  slides = [
    {
      title: "Eventrue",
      description: "This app is a marketplace for buying and selling tickets to events, including concerts, sports games, and theater performances."
    },
  ], 
  onComplete 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="relative h-[85vh] md:h-full md:w-1/2 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-pink-500 via-purple-400 to-cyan-300">
          {slides[currentSlide].imageSrc && (
            <img 
              src={slides[currentSlide].imageSrc}
              alt="Onboarding visual" 
              className="w-full h-full object-cover"
            />
          )}
        </div>


        <div className="absolute -bottom-10 left-0 right-0 md:hidden">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" transform="scale(1 -1)"><path d="M0 0h100v30Q50 10 0 10Z" fill="#fff"/></svg>
        </div>
      </div>

      <div className="relative px-6 pt-12 pb-16 flex flex-col justify-between md:w-1/2 md:p-12 bg-white md:rounded-xl md:shadow-lg md:h-full">
        {/* Clip-path mobile */}
        <div className="absolute inset-0 bg-white md:hidden" style={{
          clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 1
        }}></div>

        <div className="relative z-10">
          {/* Paginations: */}
          <div className="flex gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index} 
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-teal-500 w-6' : 'bg-gray-200'
                }`}
              ></button>
            ))}
          </div>

          <h2 className="text-teal-600 text-3xl font-semibold mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600 text-lg">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={onComplete}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip
          </button>
          <Button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="rounded-full w-12 h-12 flex items-center justify-center bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
