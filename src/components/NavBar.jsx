import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/all in one logo 1.png'
import { RainbowButton } from "@/components/magicui/rainbow-button";


const Navbar = () => {
  const [stars, setStars] = useState(0);
  
  useEffect(() => {
    // Replace 'username/repo' with your actual GitHub repository path
    fetch('https://api.github.com/repos/talaganaRajesh/AllinOne')
      .then(response => response.json())
      .then(data => setStars(data.stargazers_count))
      .catch(error => console.error('Error fetching GitHub stats:', error));
  }, []);

  return (
    <>
      <nav className="w-full bg-green-50 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <span className="text-xl md:text-2xl flex flex-row items-center font-bold">
              <Link to="/">
                <div className="flex items-center">
                  <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                  <span className="text-black">Pic Aura</span>
                  <span className="text-green-600">.in</span>
                </div>
              </Link>
            </span>
          </div>

          {/* GitHub Button */}
          <RainbowButton className="px-3 md:px-9">
            <a
              href="https://github.com/talaganaRajesh/AllinOne.git" // Replace with your actual repo URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white"
            >
              <Github size={16} className="md:size-6" />
              <span className="hidden md:flex text-sm">star on Github</span>
              <span className="font-medium text-sm md:text-base">⭐</span>
              <span className="font-medium text-sm md:text-base">{stars}</span>
            </a>
          </RainbowButton>
        </div>
      </nav>
      <div className="bottom-0 left-0 w-full h-[2px] bg-gray-300"></div>
    </>
  );
};

export default Navbar;
