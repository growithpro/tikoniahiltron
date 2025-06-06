import React from "react";
import Slider from "./Slider";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Build your product <br className="hidden sm:inline" /> with
            confidence.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            “We don’t just teach — we inspire a lifetime of learning”
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#get-started"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="flex-1">
          {/* <img
            src="https://via.placeholder.com/500x300"
            alt="Hero Illustration"
            className="w-full h-auto rounded-xl shadow-md"
          /> */}
          <Slider/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
