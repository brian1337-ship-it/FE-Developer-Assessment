import { Title } from "@/components/ui/Text";
import { Link } from "react-router-dom";
import banner_1 from "@/images/banner/banner_1.png";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          Style, <br />
          Made simple
        </Title>
        <Link
          to={"/store"}
          className="bg-shop_dark_green/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
        >
          Buy Now
        </Link>
      </div>
      <div>
        <img
          src={banner_1}
          alt="banner_1"
          loading="lazy"
          className="hidden md:inline-flex w-96"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
