import React from 'react';
import { Link } from 'react-router-dom';
import { Video, FileText, Info } from 'lucide-react';
import img1 from '../assets/beautiful-girl-with-autumn-leaves-photo.jpg'
import img2 from '../assets/Picsart_24-10-28_11-05-16-459.jpg'
import textadd from '../assets/text add thumbnail 3.jpg'

import ShineBorder from "@/components/ui/shine-border";


"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/ui/particles";



const ImageCard = () => {

  return (
    <div className="relative h-52 w-full overflow-hidden">
      {/* Original Image - Base layer */}
      <img
        src={img1}
        alt="Original"
        className="absolute inset-0 w-full h-full rounded-md object-cover"
      />
      
      {/* Background Removed Image - Top layer with animation */}
      <div className="absolute inset-0 rounded-md overflow-hidden animate-reveal bg-white">
        <img
          src={img2}
          alt="Background Removed"
          className="w-full h-full object-cover opacity-100"
        />
      </div>
    </div>
  );
};

const Home = () => {

    const { theme } = useTheme();
    const [color, setColor] = useState("#006400");

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

  const cards = [
    { title: 'Remove Background', component: ImageCard, path: '/removeBG' },
    { title: 'Add Text in BG', component: () => <img src={textadd} alt="Add Text" className="w-48 h-48 mb-4 mx-auto object-cover rounded-md" />, path: '/addtext' },
    { title: 'About me', component: () => <img src="src/assets/my photo.jpg" alt="Rajesh Talagana" className="w-48 h-48 mb-4 mx-auto object-cover rounded-md" />, path: '/about' },
    { title: 'Comming Soon', component: () => <img src="src/assets/coming soon 2.jpg" alt="coming" className="w-48 h-48 mb-4 mx-auto object-cover rounded-md" />, path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl to-green-100 from-teal-50  relative flex w-full flex-col items-center overflow-hidden rounded-lg border md:shadow-xl">
      <style>
        {`
          @keyframes reveal {
            0% { 
              clip-path: inset(0 100% 0 0);
            }
            40% { 
              clip-path: inset(0 0 0 0);
            }
            60% { 
              clip-path: inset(0 0 0 0);
            }
            100% { 
              clip-path: inset(0 100% 0 0);
            }
          }
          
          .animate-reveal {
            animation: reveal 3s linear infinite;
          }
        `}
      </style>
      
      <h1 className="text-3xl font-bold mb-2 mt-7 text-center">
        <span className="text-green-600">All in One</span> Editing suite .
      </h1>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-28">
        {cards.map((card, index) => (
          <Link key={index} to={card.path} className="block">
            <ShineBorder
            className="bg-green-100 shadow-md shadow-black z-50 p-6 hover:shadow-lg drop-shadow-md hover:shadow-black transition-shadow duration-300 relative rounded-lg border-1"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              {card.component ? (
                <card.component />
              ) : (
                <card.icon className="w-12 h-12 mb-4 mx-auto text-blue-500" />
              )}
              <h2 className="text-xl font-bold text-green-700 mt-5 text-center">{card.title}</h2>
            </ShineBorder>
          </Link>
        ))}
      </div>
      
      <div className=" bottom-0 left-0 right-0 pt-10 p-4">
        <Link to="https://talaganarajesh.vercel.app/">
        <h2 className="font-semibold text-center text-sm">
          Made with❤️ by <span className="text-green-600 font-bold text-lg">Rajesh</span>
        </h2>
        </Link>
      </div>

        <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
        />


    </div>
  );
};

export default Home;