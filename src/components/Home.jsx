import React from 'react';
import { Link } from 'react-router-dom';
import { Video, FileText, Info } from 'lucide-react';

const ImageCard = () => {
  return (
    <div className="relative h-48 overflow-hidden">
      {/* Original Image - Base layer */}
      <img
        src="src/assets/beautiful-girl-with-autumn-leaves-photo.jpg"
        alt="Original"
        className="absolute inset-0 w-full h-full rounded-md object-cover"
      />
      
      {/* Background Removed Image - Top layer with animation */}
      <div className="absolute inset-0 rounded-md overflow-hidden animate-reveal bg-white">
        <img
          src="src/assets/Picsart_24-10-28_11-05-16-459.jpg"
          alt="Background Removed"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const Home = () => {
  const cards = [
    { title: 'Remove Background', component: ImageCard, path: '/removeBG' },
    { title: 'Video Editor', icon: Video, path: '/videoEditor' },
    { title: 'Gallery', icon: FileText, path: '/gallery' },
    { title: 'About', icon: Info, path: '/about' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
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
      
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="text-green-600">' All in One '</span> Editing Suite
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-28">
        {cards.map((card, index) => (
          <Link key={index} to={card.path} className="block">
            <div className="bg-green-100 rounded-lg shadow-md shadow-black p-6 hover:shadow-lg drop-shadow-md hover:shadow-black transition-shadow duration-300">
              {card.component ? (
                <card.component />
              ) : (
                <card.icon className="w-12 h-12 mb-4 mx-auto text-blue-500" />
              )}
              <h2 className="text-xl font-bold text-green-700 mt-5 text-center">{card.title}</h2>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="font-semibold text-center text-sm">
          Made with❤️ by <span className="text-green-600 font-bold text-lg">Rajesh</span>
        </h2>
      </div>
    </div>
  );
};

export default Home;