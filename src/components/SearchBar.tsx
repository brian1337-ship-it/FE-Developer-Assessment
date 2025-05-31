import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useOutsideClick } from "@/hooks";

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useOutsideClick<HTMLDivElement>(() =>
    setIsSearchOpen(false)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
        </button>
      ) : (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-64 pr-10 text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="h-9 w-9"
          >
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
