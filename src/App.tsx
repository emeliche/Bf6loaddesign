import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { WeaponCard, Weapon } from "./components/WeaponCard";
import { LoadoutDetail } from "./components/LoadoutDetail";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Trophy, Target, Zap } from "./components/Icons";

const weapons: Weapon[] = [
  {
    id: "1",
    name: "M5A3",
    category: "Assault Rifles",
    image: "https://images.unsplash.com/photo-1636136372283-46d9ce4ebe63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhdWx0JTIwcmlmbGUlMjBjbG9zZXVwfGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 85,
    fireRate: 78,
    accuracy: 82,
    range: 75,
    mobility: 70,
    isMeta: true,
    tier: "S",
  },
  {
    id: "2",
    name: "AC-42",
    category: "Assault Rifles",
    image: "https://images.unsplash.com/photo-1662699947585-6e91a43f33df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwd2VhcG9ufGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 90,
    fireRate: 65,
    accuracy: 88,
    range: 82,
    mobility: 65,
    isMeta: true,
    tier: "S",
  },
  {
    id: "3",
    name: "K30",
    category: "SMGs",
    image: "https://images.unsplash.com/photo-1662699947585-6e91a43f33df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwd2VhcG9ufGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 70,
    fireRate: 92,
    accuracy: 68,
    range: 55,
    mobility: 88,
    isMeta: true,
    tier: "A",
  },
  {
    id: "4",
    name: "MP9",
    category: "SMGs",
    image: "https://images.unsplash.com/photo-1714381634661-ed23b4a2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjA2OTMxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 65,
    fireRate: 95,
    accuracy: 70,
    range: 50,
    mobility: 90,
    isMeta: false,
    tier: "A",
  },
  {
    id: "5",
    name: "LCMG",
    category: "LMGs",
    image: "https://images.unsplash.com/photo-1662699947585-6e91a43f33df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwd2VhcG9ufGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 88,
    fireRate: 60,
    accuracy: 75,
    range: 85,
    mobility: 45,
    isMeta: false,
    tier: "B",
  },
  {
    id: "6",
    name: "PKP-BP",
    category: "LMGs",
    image: "https://images.unsplash.com/photo-1714381634661-ed23b4a2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjA2OTMxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 92,
    fireRate: 55,
    accuracy: 78,
    range: 88,
    mobility: 40,
    isMeta: true,
    tier: "A",
  },
  {
    id: "7",
    name: "DXR-1",
    category: "Sniper Rifles",
    image: "https://images.unsplash.com/photo-1643538113930-66f086addb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmlwZXIlMjBzY29wZXxlbnwxfHx8fDE3NjA2OTMxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 98,
    fireRate: 35,
    accuracy: 95,
    range: 98,
    mobility: 35,
    isMeta: true,
    tier: "S",
  },
  {
    id: "8",
    name: "SWS-10",
    category: "Sniper Rifles",
    image: "https://images.unsplash.com/photo-1643538113930-66f086addb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmlwZXIlMjBzY29wZXxlbnwxfHx8fDE3NjA2OTMxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 95,
    fireRate: 40,
    accuracy: 92,
    range: 95,
    mobility: 38,
    isMeta: false,
    tier: "A",
  },
  {
    id: "9",
    name: "DM7",
    category: "Marksman Rifles",
    image: "https://images.unsplash.com/photo-1636136372283-46d9ce4ebe63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhdWx0JTIwcmlmbGUlMjBjbG9zZXVwfGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 82,
    fireRate: 68,
    accuracy: 85,
    range: 80,
    mobility: 60,
    isMeta: true,
    tier: "A",
  },
  {
    id: "10",
    name: "SVK",
    category: "Marksman Rifles",
    image: "https://images.unsplash.com/photo-1662699947585-6e91a43f33df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwd2VhcG9ufGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 85,
    fireRate: 62,
    accuracy: 88,
    range: 85,
    mobility: 55,
    isMeta: false,
    tier: "B",
  },
  {
    id: "11",
    name: "12M Auto",
    category: "Shotguns",
    image: "https://images.unsplash.com/photo-1714381634661-ed23b4a2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjA2OTMxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 95,
    fireRate: 72,
    accuracy: 55,
    range: 35,
    mobility: 75,
    isMeta: false,
    tier: "B",
  },
  {
    id: "12",
    name: "MCS-880",
    category: "Shotguns",
    image: "https://images.unsplash.com/photo-1662699947585-6e91a43f33df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRhY3RpY2FsJTIwd2VhcG9ufGVufDF8fHx8MTc2MDY5MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    damage: 98,
    fireRate: 45,
    accuracy: 60,
    range: 30,
    mobility: 70,
    isMeta: false,
    tier: "C",
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const filteredWeapons = useMemo(() => {
    return weapons.filter((weapon) => {
      const matchesCategory =
        selectedCategory === "all" ||
        weapon.category.toLowerCase().includes(selectedCategory);
      const matchesSearch = weapon.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const metaWeapons = weapons.filter((w) => w.isMeta).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white dark">
      <Header onSearch={setSearchQuery} />
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1741722604322-f0d0d8223418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGVmaWVsZCUyMHNvbGRpZXJ8ZW58MXx8fHwxNzYwNjkzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-green-600 text-black px-4 py-1.5 uppercase tracking-wider">
                Season 3 - October 2025
              </Badge>
              <div className="flex-1 h-px bg-green-600/30"></div>
            </div>
            
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-green-500 mb-6 tracking-tight">
                Battlefield 6 Meta Loadouts
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
                Discover the best weapon loadouts, attachments, and builds to dominate the battlefield. Updated weekly with the latest meta.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => {
                  const section = document.getElementById('weapons-section');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 uppercase tracking-wider transition-colors"
              >
                Browse Loadouts
              </button>
              <button 
                onClick={() => {
                  const metaSection = document.getElementById('meta-section');
                  metaSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gray-800 hover:bg-gray-700 text-green-500 border border-green-600/30 px-8 py-3 uppercase tracking-wider transition-colors"
              >
                View Meta Picks
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/60 border-green-600/30 backdrop-blur-sm p-6 hover:border-green-600/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded">
                    <Trophy className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-3xl text-green-500">{weapons.length}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Weapons</div>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-black/60 border-green-600/30 backdrop-blur-sm p-6 hover:border-green-600/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-3xl text-green-500">{metaWeapons.length}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Meta Builds</div>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-black/60 border-green-600/30 backdrop-blur-sm p-6 hover:border-green-600/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-green-600/20 p-3 rounded">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-3xl text-green-500">24/7</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Updates</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Loadouts Section */}
      {selectedCategory === "all" && !searchQuery && (
        <div id="meta-section" className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-green-500 mb-2">Top Meta Loadouts</h2>
            <p className="text-gray-400">
              The most effective weapons in the current meta
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {metaWeapons.map((weapon) => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                onSelect={setSelectedWeapon}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Weapons Grid */}
      <div id="weapons-section" className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-green-500 mb-2">
            {selectedCategory === "all" ? "All Weapons" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Weapons`}
          </h2>
          <p className="text-gray-400">
            {filteredWeapons.length} weapon{filteredWeapons.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWeapons.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              onSelect={setSelectedWeapon}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                <span className="text-xs text-black">BF6</span>
              </div>
              <span className="text-gray-400">
                © 2025 Battlefield 6 Loadouts. Not affiliated with EA or DICE.
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Loadout Detail Modal */}
      {selectedWeapon && (
        <LoadoutDetail
          weapon={selectedWeapon}
          onClose={() => setSelectedWeapon(null)}
        />
      )}
    </div>
  );
}
