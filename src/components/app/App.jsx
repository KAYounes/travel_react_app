import './App.module.css'
import Navbar from '/src/components/navbar/Navbar.jsx'
import Header from '/src/components/header/Header.jsx'
import Sponsors from '/src/components/sponsors/Sponsors.jsx';
import CategorySec from '/src/components/category_section/CategorySec.jsx'
import HoneymoonPkgSec from '/src/components/honeymoon_pkg_section/HoneymoonPkgSec.jsx';
import FastAndEasySec from '/src/components/fast_and_easy_section/FastAndEasySec.jsx'
import AdHeroSec from '/src/components/ad_hero_section/AdHeroSec.jsx'
import PromotionSec from '/src/components/promotion_section/PromotionSec.jsx'
import ExploreSec from '/src/components/explore_section/ExploreSec.jsx'
import TrendyPkgSec from '/src/components/trendy_packages_section/TrendyPkgSec.jsx'
import TestimonialsSec from '/src/components/testimonials_section/TestimonialsSec.jsx'
import Footer from '/src/components/footer/Footer.jsx'


// Clears console after hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

function App() {
  return (
    <>
      <Navbar
      />

      <Header
      />

      <Sponsors
      />

      <CategorySec
      />

      <HoneymoonPkgSec
      />

      <FastAndEasySec
      />

      <AdHeroSec
      />

      <PromotionSec
      />

      <ExploreSec
      />

      <TrendyPkgSec
      />

      <TestimonialsSec
      />

      <Footer
      />
    </>
  )
}

export default App
