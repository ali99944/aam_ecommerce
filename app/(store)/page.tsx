import Hero from "@/components/custom/hero";
import Navbar from "@/components/header";
import FeaturedProducts from "@/components/blocks/featured-products";
import FeaturesSection from "@/components/blocks/features-section";
import JustArrived from "@/components/blocks/just-arrived";
import LimitedOffers from "@/components/blocks/limited-offers";
import PromotionalBanners from "@/components/blocks/promotional-banners";
import PromotionalGrid from "@/components/blocks/promotional-grid";
import SecondaryHero from "@/components/blocks/secondary-hero";
import ShopByCategories from "@/components/ui/shop-by-category";
import BlogBrands from "@/components/custom/blog-brands";
import SpecialProductsHero from "@/components/custom/special-products";
import VRTestimonials from "@/components/custom/vr-testimonials";
import Footer from "@/components/custom/footer";
import AboutSection from "@/components/custom/about-section";
import NewsletterSection from "@/components/custom/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <PromotionalBanners />
      <FeaturedProducts />
      <SecondaryHero />
      <ShopByCategories />
      <PromotionalGrid />
      <LimitedOffers />
      <JustArrived />
      <VRTestimonials />
      <SpecialProductsHero />
      <BlogBrands />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
