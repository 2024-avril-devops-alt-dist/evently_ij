"use client";

import EventCard, { EventCardProps } from "./eventCard";

export default function EventList({ events }: { events: EventCardProps[] }) {
  return (
    <div className="w-full pb-14">
      <h2 className="text-2xl font-bold mb-6 text-black">Événements à venir</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}