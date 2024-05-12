import React, { useEffect } from "react";
import Layout from "../../components/layout.jsx/layout";
import HeroSection from "../heroSection/hero";
import Category from "../../components/categories/category";
import HomePageProductCard from "../../components/homeProducts/homeProduct";
import Track from "../../components/track/tracks";
import Testimonial from "../../components/testimonials/testimonials";

const home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Layout>
        <HeroSection />
        <Category />
        <HomePageProductCard />
        <Track />
        <Testimonial />
      </Layout>
    </>
  );
};

export default home;
