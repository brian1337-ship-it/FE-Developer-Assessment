import { Link } from "react-router-dom";
interface Props {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {categories?.map((category) => (
            <button
              onClick={() => setSelectedCategory(category)}
              key={category}
              className={`border border-shop_light_green/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect ${
                selectedCategory === category
                  ? "bg-shop_light_green text-white border-shop_light_green"
                  : "bg-shop_light_green/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <Link
        to={"/store"}
        className="border border-darkColor px-4 py-1 rounded-full hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect"
      >
        See all
      </Link>
    </div>
  );
};

export default CategoryBar;
