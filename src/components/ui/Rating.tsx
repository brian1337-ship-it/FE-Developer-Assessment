import { Star } from "lucide-react";
import { cn } from "@/utils/styleMerge";

interface RatingProps {
  rating?: number;
  count?: number;
  maxStars?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
  starClassName?: string;
}

const Rating = ({
  rating = 0,
  count,
  maxStars = 5,
  size = 16,
  showCount = true,
  className,
  starClassName,
}: RatingProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;

          if (rating >= starValue) {
            // Full star
            return (
              <Star
                key={index}
                className={cn("text-shop_light_green", starClassName)}
                size={size}
                fill="currentColor"
              />
            );
          } else if (rating >= starValue - 0.5) {
            // Partial star (using CSS mask for half-fill effect)
            return (
              <div key={index} className="relative">
                <Star
                  className={cn("text-lightText", starClassName)}
                  size={size}
                  fill="currentColor"
                />
                <Star
                  className={cn(
                    "text-shop_light_green absolute top-0 left-0",
                    starClassName
                  )}
                  size={size}
                  fill="currentColor"
                  style={{
                    clipPath: "inset(0 50% 0 0)",
                  }}
                />
              </div>
            );
          } else {
            // Empty star
            return (
              <Star
                key={index}
                className={cn("text-lightText", starClassName)}
                size={size}
              />
            );
          }
        })}
      </div>
      {showCount && (
        <p className="text-lightText text-xs tracking-wide">
          {rating > 0 ? `${rating.toFixed(1)}` : "No rating"} ({count || 0}{" "}
          Reviews)
        </p>
      )}
    </div>
  );
};

export { Rating };
