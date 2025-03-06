"use client";

import Image from "next/image";
import Link from "next/link";

export interface EventCardProps {
  id: string | number;
  name: string;
  desc: string;
  picture?: string;
  start_at?: Date;
  location?: string;
  price?: number;
  discount?: number;
  category?: string;
}

export default function EventCard({ event }: { event: EventCardProps }) {
  const {
    id,
    name,
    picture = "/images/homepage/safari.jpg",
    start_at,
    location = "Sevran, France",
    price = 10,
    discount = 10,
    // category = "event"
  } = event;

  const formattedDate = start_at 
    ? new Date(start_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : "21 janvier 2023";
  
  const discountedPrice = discount ? price - discount : undefined;

  return (
    <Link href={`/events/${id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <div className="flex items-center">
          
          <div className="relative rounded-xl" style={{ width: '71px', height: '81px', minWidth: '81px' }}>
            {picture ? (
              <Image
                src={"/images/homepage/safari.jpg"}
                alt={name}
                width={81}
                height={81}
                className="w-full h-full object-cover rounded-xl p-1 "
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">pas d image</span>
              </div>
            )}
          </div>
          
          {/* Contenu  */}
          <div className="flex-grow p-4 flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-1 text-black">{name}</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">{location}</span>
            </div>
          </div>
          
          <div className="p-4 flex flex-col justify-center items-end">
            {discountedPrice !== undefined ? (
              <div className="text-right">
                <div className="text-gray-400 line-through text-xs">${price}</div>
                <div className="text-emerald-600 font-bold text-xl">${discountedPrice}</div>
              </div>
            ) : (
              <div className="text-emerald-600 font-bold text-xl">${price}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}