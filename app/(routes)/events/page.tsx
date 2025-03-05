"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@/service/eventService";
import { Card } from "@heroui/react";


interface Event {
  id: string | number;
  name: string;
  desc: string;
  picture?: string;
  date?: string;
  location?: string;
}

export default function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour accélérer le défilement
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    const touch = e.touches[0];
    setStartX(touch.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    const touch = e.touches[0];
    const x = touch.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
        Événements
      </h1>
      <div 
        ref={carouselRef}
        className="carousel flex overflow-x-scroll space-x-6 pb-6 no-scrollbar scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {events.map((event) => (
          <div 
            key={event.id} 
            className="carousel-item flex-shrink-0 w-72 md:w-96"
          >
            <Link href={`/events/${event.id}`}>
              <Card className="rounded-2xl overflow-hidden shadow-lg">
                <div className="relative w-full aspect-video ">
                  <Image
                    src={'/images/homepage/safari.jpg'}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                    Like
                  </div>
                </div>
                <div className="p-4 bg-white-400 flex flex-col h-48">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {event.name}
                    </h2>
                    <p className="text-sm text-greyLight line-clamp-3">
                      {event.desc}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="w-full bg-greenLight text-greenDark py-2 rounded-lg text-sm font-semibold hover:bg-greenLight/80 transition">
                      Rebooking
                    </button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}