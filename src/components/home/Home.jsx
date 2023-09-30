// import 
import Navbar from '../navbar/Navbar.jsx'
import Header from '../header/Header.jsx'
import Sponsors from '../sponsors/Sponsors.jsx';
import CategorySec from '../category_section/CategorySec.jsx'
import HoneymoonPkgSec from '../honeymoon_pkg_section/HoneymoonPkgSec.jsx';
import FastAndEasySec from '../fast_and_easy_section/FastAndEasySec.jsx'
import AdHeroSec from '../ad_hero_section/AdHeroSec.jsx'
import PromotionSec from '../promotion_section/PromotionSec.jsx'
import ExploreSec from '../explore_section/ExploreSec.jsx'
import TrendyPkgSec from '../trendy_packages_section/TrendyPkgSec.jsx'
import TestimonialsSec from '../testimonials_section/TestimonialsSec.jsx'
import Footer from '../footer/Footer.jsx'

export default function Home() 
{
  return (
    <>
      <Navbar />
      <Header />
      <Sponsors />
      <CategorySec />
      <HoneymoonPkgSec />
      <FastAndEasySec />
      <AdHeroSec />
      <PromotionSec />
      <ExploreSec />
      <TrendyPkgSec />
      <TestimonialsSec />
      <Footer />
    </>
  );
}
