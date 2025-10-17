import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "All Weapons" },
  { id: "assault", label: "Assault Rifles" },
  { id: "smg", label: "SMGs" },
  { id: "lmg", label: "LMGs" },
  { id: "sniper", label: "Sniper Rifles" },
  { id: "dmr", label: "Marksman Rifles" },
  { id: "shotgun", label: "Shotguns" },
];

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="border-b border-gray-800 bg-gray-900/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-green-500">Weapon Categories</h2>
            <Badge variant="outline" className="border-green-500/30 text-green-500">
              Meta Updated: Oct 2025
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-green-600 hover:bg-green-700 text-black"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-green-500"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
