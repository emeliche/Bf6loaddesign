import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, Star } from "./Icons";

export interface Weapon {
  id: string;
  name: string;
  category: string;
  image: string;
  damage: number;
  fireRate: number;
  accuracy: number;
  range: number;
  mobility: number;
  isMeta: boolean;
  tier: "S" | "A" | "B" | "C";
}

interface WeaponCardProps {
  weapon: Weapon;
  onSelect: (weapon: Weapon) => void;
}

export function WeaponCard({ weapon, onSelect }: WeaponCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "S":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "A":
        return "bg-green-500/20 text-green-500 border-green-500/50";
      case "B":
        return "bg-blue-500/20 text-blue-500 border-blue-500/50";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/50";
    }
  };

  return (
    <Card className="group overflow-hidden bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all cursor-pointer">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-video">
        {weapon.isMeta && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-black z-10">
            <TrendingUp className="h-3 w-3 mr-1" />
            META
          </Badge>
        )}
        <Badge className={`absolute top-2 right-2 ${getTierColor(weapon.tier)} z-10`}>
          {weapon.tier} Tier
        </Badge>
        <ImageWithFallback
          src={weapon.image}
          alt={weapon.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-gray-100 mb-1">{weapon.name}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{weapon.category}</p>
        </div>
        
        <div className="space-y-2">
          <StatBar label="Damage" value={weapon.damage} />
          <StatBar label="Fire Rate" value={weapon.fireRate} />
          <StatBar label="Accuracy" value={weapon.accuracy} />
          <StatBar label="Range" value={weapon.range} />
          <StatBar label="Mobility" value={weapon.mobility} />
        </div>
        
        <Button
          onClick={() => onSelect(weapon)}
          className="w-full bg-green-600 hover:bg-green-700 text-black"
        >
          View Loadout
        </Button>
      </div>
    </Card>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{value}</span>
    </div>
  );
}
