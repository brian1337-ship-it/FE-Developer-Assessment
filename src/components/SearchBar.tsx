import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useOutsideClick } from "@/hooks/useUI";
import { useSearchProducts } from "@/hooks/useFakeStoreApi";

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1); // Keyboard navigation index
  const navigate = useNavigate();

  // Close search when clicking outside
  const searchRef = useOutsideClick<HTMLDivElement>(() => {
    setIsSearchOpen(false);
    setSelectedIndex(-1);
  });

  // Delayed query for API calls: Wait 300ms after user stops typing before making API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer); // Cleanup on each keystroke
  }, [searchQuery]);

  // Fetch suggestions using debounced query (caching handled by React Query)
  const { data: suggestions = [] } = useSearchProducts(debouncedQuery);
  const limitedSuggestions = suggestions.slice(0, 5); // Show max 5 suggestions

  // Navigate to search results page with query parameter
  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSelectedIndex(-1);
    }
  };

  // Handle keyboard navigation (arrows, enter, escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      // Close search overlay
      setIsSearchOpen(false);
      setSearchQuery("");
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown") {
      // Navigate down suggestions list
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < limitedSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      // Navigate up suggestions list
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      // Search selected suggestion or current query
      e.preventDefault();
      if (selectedIndex >= 0 && limitedSuggestions[selectedIndex]) {
        handleSearch(limitedSuggestions[selectedIndex].title);
      } else {
        handleSearch();
      }
    }
  };

  // Show suggestions when search is open, query is 2+ chars, and we have results
  const showSuggestions =
    isSearchOpen && searchQuery.length >= 2 && limitedSuggestions.length > 0;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative z-10"
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 bg-white shadow-lg">
            <div ref={searchRef} className="max-w-screen-xl mx-auto px-4 py-4">
              {/* Search input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value); // Triggers debounce effect
                      setSelectedIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full pr-10 text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                {/* Close button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    setSelectedIndex(-1);
                  }}
                  className="h-9 w-9 shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>

              {/* Live search suggestions dropdown */}
              {showSuggestions && (
                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
                  {limitedSuggestions.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearch(product.title)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 flex items-center gap-3 ${
                        selectedIndex === index ? "bg-gray-50" : ""
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 object-contain rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-shop_orange">
                        ${product.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
