"use client";

import Image from "next/image";
import { ChevronLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/service/eventService";
import TicketCard from "@/app/components/ticket_card";

interface Address {
  city?: string;
  country?: string;
  coordinates?: [number, number];
}

interface Event {
  id: string | number;
  name: string;
  desc: string;
  picture?: string;
  date?: string;
  location?: string;
  adress: Address;
  start_at: string;
  end_at: string;
}

export default function EventDetailHeader() {
  const { id } = useParams<{ id: string }>(); 
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      getEventById(id)
        .then(setEvent)
        .catch(console.error);
    }
  }, [id]);

  if (!event) return <p>Chargement...</p>;

  function formatAdress(adress: Address): string {
    if (!adress || typeof adress !== "object") return "Adresse inconnue";
    
    if (adress.coordinates && Array.isArray(adress.coordinates)) {
      return ` ${adress.coordinates[1]}, ${adress.coordinates[0]}`;
    }
  
    return "Adresse non spécifiée";
  }
  
  return (
    <>
    <div className="relative">
      <div className="relative h-96 w-full">
        <Image
          src={ "/images/homepage/culture.jpg"}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm" onClick={() => router.back()}>
            <ChevronLeft className="text-white" size={24} onClick={() => router.push("/events")}/>
          </button>
          <button
            className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
            onClick={() => setIsLiked(!isLiked)} >
            <Heart className={isLiked ? "text-red-500" : "text-white"} size={24} />
          </button>
        </div>
      </div>

      <div className="px-0 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            {event.name}
          </h1>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">📅</span>
              <span className="text-gray-600">{new Date(event.start_at).toLocaleDateString()} - {new Date(event.end_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">📍</span>
              <span className="text-gray-600"> {formatAdress(event.adress)}</span>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{event.desc}</p>
          
        <div>
        <h2 className="text-black text-xl font-bold mb-4 py-2">Votre Qr code de l&apos;evenement:</h2>
       <TicketCard
        ticketId="32212"
        instructions="Scan this QR code or show this ticket at of concert" />
        </div>

        </div>
      </div>
</div>
</>
  );
}
