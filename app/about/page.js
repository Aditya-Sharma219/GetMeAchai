import React from 'react'

const About = () => {
  return (
    <section className="min-h-screen text-white px-6 md:px-12 py-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6">
          About <span className="text-yellow-400">Me</span>
        </h1>

        {/* Aspirations & Aims */}
        <p className="text-lg text-gray-300 mb-12">
        I am a highly ambitious individual with a <strong>strong entrepreneurial mindset</strong>, dedicated to building a massive brand in the tech and business world.  
          My ultimate goal is to become a millionaire by 25, a multi-millionaire by 30, and create a globally recognized brand by 40-45.  
          I thrive on learning, executing, and constantly pushing my limits to achieve greatness.  
          Alongside my business journey, I am deeply passionate about web development, tech, fitness, and personal growth.
        </p>

        {/* Tech Stack */}
        <h2 className="text-3xl font-semibold mb-4">My Tech Stack 🚀</h2>
        <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-200">
          <span className="bg-blue-800 px-4 py-2 rounded-lg">Next.js 15</span>
          <span className="bg-purple-800 px-4 py-2 rounded-lg">React</span>
          <span className="bg-green-700 px-4 py-2 rounded-lg">MongoDB</span>
          <span className="bg-yellow-600 px-4 py-2 rounded-lg">JavaScript</span>
          <span className="bg-gray-700 px-4 py-2 rounded-lg">Tailwind CSS</span>
          <span className="bg-red-600 px-4 py-2 rounded-lg">Express.js</span>
          <span className="bg-indigo-700 px-4 py-2 rounded-lg">Vite</span>
        </div>
      </div>
    </section>
  )
}

export default About
