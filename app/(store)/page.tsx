import Hero from "@/components/custom/hero";
import Navbar from "@/components/navbar";
import FeaturedProducts from "@/components/blocks/featured-products";
import FeaturesSection from "@/components/blocks/features-section";
import JustArrived from "@/components/blocks/just-arrived";
import LimitedOffers from "@/components/blocks/limited-offers";
import PromotionalGrid from "@/components/blocks/promotional-grid";
import ShopByCategories from "@/components/ui/shop-by-category";
import TopDiscountsProducts from "@/components/custom/top-discount-products";
import Testimonials from "@/components/custom/testimonials";
import Footer from "@/components/footer";
import AboutSection from "@/components/custom/about-section";
import NewsletterSection from "@/components/custom/newsletter";
import PromotionalOffers from "@/components/blocks/promotional-offers";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <FeaturedProducts />
      <ShopByCategories />
      <PromotionalGrid />
      <LimitedOffers />
      <JustArrived />
      <PromotionalOffers />
      <Testimonials />
      <TopDiscountsProducts />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
