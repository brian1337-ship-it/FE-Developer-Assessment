import Title from "@/components/Title";
import { Label } from "@/components/ui/label";
import Checkbox from "@/components/ui/checkbox";

interface Props {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const CategoryList = ({
  categories,
  selectedCategories,
  onCategoryToggle,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-sm font-black">Product Categories</Title>
      <div className="mt-2 space-y-2">
        {categories?.map((category, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => onCategoryToggle(category)}
          >
            <Checkbox
              id={`category-${index}`}
              checked={selectedCategories.includes(category)}
              className="rounded-sm"
            />
            <Label
              htmlFor={`category-${index}`}
              className={`capitalize cursor-pointer ${
                selectedCategories.includes(category)
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }`}
            >
              {category}
            </Label>
          </div>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <button
          onClick={() =>
            selectedCategories.forEach((cat) => onCategoryToggle(cat))
          }
          className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
        >
          Clear all ({selectedCategories.length})
        </button>
      )}
    </div>
  );
};

export default CategoryList;
