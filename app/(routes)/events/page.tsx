"use client";
import { useEffect,  useState } from "react";
import { getEvents } from "@/service/eventService";
import EventList from "@/app/components/event_list";
import EventsCarousel from "@/app/components/eventcarousel";


interface Event {
  id: string | number;
  name: string;
  desc: string;
  picture?: string;
  date?: string;
  location?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);


  return (
    <main className=" bg-gray-100 px-4 sm:px-6 lg:px-8">
  <EventsCarousel />
      <div className="mt-12">  
        <EventList events={events} />  
      </div>
    </main>
  );
}