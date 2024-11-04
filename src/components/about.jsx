import React from 'react';
import { Github, Instagram, Linkedin, Mail, Globe } from 'lucide-react';
import myphoto from "../assets/my photo.jpg"
const profileImage = {myphoto};


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {children}
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ImageViewer = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <img 
        src={src}
        alt={alt}
        onClick={() => setIsModalOpen(true)}
        className="w-fit h-48 rounded-full shadow-lg border-4 border-green-500 object-cover cursor-pointer hover:opacity-90 transition-opacity"
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img 
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />
      </Modal>
    </>
  );
};



const About = () => {
  const socialLinks = [
    {
      icon: Github,
      url: "https://github.com/talaganarajesh",
      label: "GitHub"
    },
    {
      icon: Instagram, 
      url: "https://www.instagram.com/talagana_rajesh/",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/talagana-rajesh-75a546289/",
      label: "LinkedIn"
    },
    {
      icon: Globe,
      url: "https://talaganarajesh.vercel.app/",
      label: "Portfolio"
    },
    {
      icon: Mail,
      url: "mailto:talaganarajesh@gmail.com",
      label: "Gmail"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl to-green-100 from-teal-50 p-8 pt-2">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          About <span className="text-green-600">Me</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center mb-10 justify-between gap-8">
          <ImageViewer src={profileImage} alt="Rajesh Talagana" />
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-100 rounded-full 
                         hover:bg-green-200 transition-colors duration-300"
              >
                <link.icon className="w-5 h-5 text-green-700" />
                <span className="font-medium text-green-700">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mb-8 text-lg text-gray-700 leading-relaxed">
          <p className="mb-4">
            Hi! I'm Talagana Rajesh, a passionate web developer and designer. I specialize in creating 
            intuitive and efficient web applications that solve real-world problems.
          </p>
          <p className="mb-4">
            This All-in-One Photo Editor is one of my projects that demonstrates my ability to create 
            practical solutions using modern web technologies. It combines various image editing features 
            into a single, easy-to-use platform.
          </p>
          <p>
            I'm always excited to work on new projects and collaborate with other developers. Feel free 
            to reach out to me through any of the social links below!
          </p>
        </div>


      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-600">
          Made with ❤️ by <span className="text-green-600 font-bold">Rajesh</span>
        </p>
      </div>
    </div>
  );
};

export default About;
