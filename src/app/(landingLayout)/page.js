import Banner from "@/components/LandingPages/Home/Banner";
import Brands from "@/components/LandingPages/Home/Brands";
import NewsletterBanner from "@/components/LandingPages/Home/NewsletterBanner";
import NewArrivalProducts from "@/components/LandingPages/Home/Products/NewArrivalProducts";
import FeaturedProducts from "@/components/LandingPages/Home/Products/FeaturedProducts";
import RecentlyViewedProducts from "@/components/LandingPages/Home/Products/RecentlyViewedProducts";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <NewArrivalProducts />
      <FeaturedProducts />
      <Brands />
      <RecentlyViewedProducts />
      <NewsletterBanner />
    </div>
  );
};

export default page;
