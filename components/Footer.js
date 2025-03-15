import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white flex flex-col md:flex-row items-center justify-between px-6 py-4 text-center">
      <p className="text-sm md:text-base">
        &copy; {new Date().getFullYear()} Get Me a Chai | Made with ❤️ by Aditya Sharma  
      </p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <Link href="https://github.com/Aditya-Sharma219/" target="_blank">
          <FaGithub className="text-2xl hover:text-gray-400 transition duration-300" />
        </Link>
        <Link href="https://www.linkedin.com/in/aditya-sharma-49a9142a6/" target="_blank">
          <FaLinkedin className="text-2xl hover:text-blue-500 transition duration-300" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
