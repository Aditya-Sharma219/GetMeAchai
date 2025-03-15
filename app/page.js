import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home  text-white ">
      <div className="hero h-[100vh] flex flex-col justify-center items-center text-center py-12">
        <h1 className="text-3xl flex justify-center items-center gap-1 font-bold mb-4">Buy me a Chai <span><lord-icon
          className="w-13 h-13"
          src="https://cdn.lordicon.com/elcmkycs.json"
          trigger="hover"
        >
        </lord-icon></span> </h1>
        <p className="text-lg mb-6">
          A crowdfunding platform for creators. Get by your fans and followers.
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            className="cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
          font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
          shadow-lg shadow-purple-800/50 hover:shadow-purple-500/50">
            Buy Now
          </button>
          <Link href={"/about"}>
          <button
            type="button"
            className="cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
            focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
            shadow-lg shadow-purple-800/50 hover:shadow-purple-500/50">
            Read More...
          </button>
            </Link>
        </div>

      </div>
      <div className="bg-gray-800/80 h-2">
      </div>

      <section className="w-full px-6 md:px-12 py-16 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Your Fans Can <span className="text-yellow-400">Buy You a Chai</span>
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Connect with your audience and get support from your biggest fans.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <Image
              unoptimized
              src="/avatar.gif"
              alt="avatar"
              width={250}
              height={250}
              className="mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4">Fund Yourself</h2>
            <p className="text-gray-400 mt-2">
              Your fans are ready to support your journey.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <Image
              unoptimized
              src="/coin.gif"
              alt="coin"
              width={240}
              height={240}
              className="mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4">Receive Donations</h2>
            <p className="text-gray-400 mt-2">
              Let your supporters fund your passion.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
            <Image
              unoptimized
              src="/group.gif"
              alt="group"
              width={240}
              height={240}
              className="mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4">Grow with Community</h2>
            <p className="text-gray-400 mt-2">
              Build strong relationships with your fans.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-800/80 h-2">
      </div>


      <section className="w-full px-6 md:px-12 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Learn More <span className="text-yellow-400">About Us</span>
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            We are a <strong>crowdfunding platform</strong> that helps creators,
            artists, and innovators connect with their audience.
          </p>

          <p className="text-lg text-gray-300 mb-8">
            Our mission is to <strong>empower creators</strong> by making it easier
            to build a loyal community and turn passion into a career.
          </p>

          <Link
            href="/about"
            className="inline-block px-6 py-3 text-lg font-semibold rounded-lg 
      bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 shadow-md"
          >
            Read More
          </Link>
        </div>
      </section>


    </div>
  );
}