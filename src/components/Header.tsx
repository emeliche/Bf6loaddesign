import { Search, Menu } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-900/30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                <span className="text-black">BF6</span>
              </div>
              <div>
                <h1 className="text-green-500 tracking-wider">BATTLEFIELD 6</h1>
                <p className="text-xs text-gray-400">Loadout Builder</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Meta Loadouts</a>
              <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Weapons</a>
              <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Attachments</a>
              <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Guides</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search weapons..."
                className="pl-10 w-64 bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
