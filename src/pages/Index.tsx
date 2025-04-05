
import React, { useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import HoneyBenefits from '@/components/HoneyBenefits';
import Testimonials from '@/components/Testimonials';
import HoneyRecipes from '@/components/HoneyRecipes';
import HoneyPurityChecker from '@/components/HoneyPurityChecker';
import Newsletter from '@/components/Newsletter';

const Index = () => {
  useEffect(() => {
    // Simulate analytics tracking of page view
    console.log('Home page viewed', { timestamp: new Date().toISOString() });
  }, []);
  
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <HoneyBenefits />
      <HoneyRecipes />
      <HoneyPurityChecker />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Index;
