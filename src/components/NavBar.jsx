import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <nav className="w-full bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            <Link to="/">
              <span className="text-black">All in one</span>
              <span className="text-green-600">.in</span>
            </Link>
          </span>
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/talaganaRajesh/AllinOne.git" // Replace with your actual repo URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Github size={20} />
          <span className="font-medium">{stars}</span>
          <div className="w-1 h-1 bg-green-600 rounded-full" />
          <span className="font-medium">⭐</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
