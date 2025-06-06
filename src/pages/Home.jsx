import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Courses from "../components/AllCourses";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <Header />
      
      
     
      {/* <Slider/> */}
      <Hero />
      <Courses />
      <Testimonials />
      <Gallery />
      <Footer />
    </>
  );
};

export default Home;
