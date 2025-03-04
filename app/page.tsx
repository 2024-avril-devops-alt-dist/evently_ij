"use client"
import { useRouter } from 'next/navigation';
import OnboardingCarousel from './components/carousel_home';

export default function Home(): React.ReactNode {
  const router = useRouter();
  
  const slides = [
    {
      title: "Eventrue",
      description: "This app is a marketplace for buying and selling tickets to events, including concerts, sports games, and theater performances.",
      imageSrc: "/images/homepage/concert.jpg" 
    },
    {
      title: "Discover Events",
      description: "Explore and discover amazing events happening around you with our intuitive search features.",
      imageSrc: "/images/homepage/safari.jpg" 
    },
    {
      title: "Buy & Sell Tickets",
      description: "Easily purchase tickets or sell your own within our secure marketplace with just a few taps.",
      imageSrc: "/images/homepage/culture.jpg"
    }
  ];
  
  const handleComplete = () => {
    router.push('/');
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <OnboardingCarousel 
          slides={slides} 
          onComplete={handleComplete} 
        />
      </div>
    </main>
  );
}