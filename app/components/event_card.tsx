import Image from "next/image";
import { Card } from "@heroui/react";

interface EventCardProps {
  category: string;
  name: string;
  date: string;
  location: string;
  image: string;
  oldPrice: number;
  newPrice: number;
}

export default function EventCard({
  category,
  name,
  date,
  location,
  image,
}: EventCardProps) {
  return (
    <Card className="flex items-center bg-white shadow-lg rounded-xl p-4 space-x-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <Image src={image} alt={name} width={80} height={80} className="object-cover" />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-sm text-gray-400">{category}</span>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      <div className="text-right">
        <span className="text-gray-400 line-through font-semibold">$free</span>
        <br />
        <span className="text-green-600 font-bold text-lg">$free</span>
      </div>
    </Card>
  );
}
