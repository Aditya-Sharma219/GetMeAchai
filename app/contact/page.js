import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
      <p className="text-gray-300 text-lg mb-8">
        Have a question, collaboration idea, or just want to say hi? Feel free to reach out!
      </p>

      <div className="flex space-x-6 mb-6">
        <Link href="https://github.com/Aditya-Sharma219/" target="_blank">
          <FaGithub className="text-4xl hover:text-gray-400 transition duration-300" />
        </Link>
        <Link href="https://www.linkedin.com/in/aditya-sharma-49a9142a6/" target="_blank">
          <FaLinkedin className="text-4xl hover:text-blue-500 transition duration-300" />
        </Link>
      </div>

      <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Message</label>
          <textarea
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your Message"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white py-2 rounded-lg font-medium"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
