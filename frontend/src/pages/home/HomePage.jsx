import React from 'react'
import HeroSection from './HeroSection'
import Highlight from './Highlight'
import FeaturedCollections from './FeaturedCollections'
import OfferSection from './OfferSection'
import TrustBuilding from './TrustBuilding'
import Testimonials from './Testimonials'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <Highlight/>
      <FeaturedCollections/>
      <OfferSection/>
      <TrustBuilding/>
      <Testimonials/>
    </div>
  )
}

export default HomePage
