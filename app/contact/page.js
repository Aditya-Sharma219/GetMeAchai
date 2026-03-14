"use client";

import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("access_key", WEB3_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        toast.success("Message sent successfully ✅");
        formRef.current.reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        toast.error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#1f0b2c] via-[#261948] to-[#0d0d0d] pt-30 py-20 px-6 min-h-screen">
        <ToastContainer />

        <div className="relative z-10 max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur-lg shadow-xl px-6 py-10 md:px-10 border border-white/10">

          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-center">
            Let’s Build Together 🚀
          </h3>

          <p className="text-md text-gray-300 mb-6 text-center max-w-2xl mx-auto">
            Have a query or want to collaborate?
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="hidden"
              name="subject"
              value="New Contact Message from GetMeChai"
            />

            <input type="checkbox" name="botcheck" className="hidden" />

            {/* Name */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Your Email
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Message
              </label>

              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what you need..."
                className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 cursor-pointer bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span className="animate-pulse">💌</span>
              <span>Send Message</span>
            </button>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-emerald-400 text-center font-medium mt-3"
                >
                  ✅ Message received! We’ll get back to you soon.
                </motion.p>
              )}
            </AnimatePresence>

          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;