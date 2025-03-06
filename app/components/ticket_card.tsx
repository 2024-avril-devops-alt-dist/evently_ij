"use client";

import Image from "next/image";

interface TicketCardProps {
  ticketId: string;
  instructions?: string;
  imageSrc?: string;
}

export default function TicketCard({ 
  ticketId, 
  instructions = "Scan this QR code or show this ticket at of concert",
  imageSrc = "/images/qrcode.avif"
}: TicketCardProps) {
  return (
    <div className="bg-greyBg rounded-lg overflow-hidden shadow-sm">
      <div className="flex p-4">
        <div className="flex-1 pr-4">
          <p className="text-gray-800 font-medium mb-2">
            {instructions}
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <p className="text-greyText">Ticket ID :</p>
            <p className="text-xl font-bold text-black">{ticketId}</p>
          </div>
        </div>
        
        <div className="w-32 h-32 bg-white flex items-center justify-center">
          <Image 
            src={imageSrc}
            alt="qr code img" 
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}