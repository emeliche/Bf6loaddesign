import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X, Copy, Share2, CheckCircle } from "./Icons";
import { Weapon } from "./WeaponCard";

interface LoadoutDetailProps {
  weapon: Weapon;
  onClose: () => void;
}

const attachmentSlots = {
  optic: ["Holographic Sight", "Red Dot", "ACOG 4x", "Thermal Scope", "Reflex Sight"],
  barrel: ["Extended Barrel", "Suppressor", "Compensator", "Heavy Barrel", "Short Barrel"],
  underbarrel: ["Vertical Foregrip", "Angled Foregrip", "Bipod", "Laser Sight", "Tactical Grip"],
  magazine: ["Extended Mag", "Fast Mag", "Dual Mag", "Drum Mag", "Standard Mag"],
  stock: ["Tactical Stock", "Heavy Stock", "No Stock", "Skeleton Stock", "Precision Stock"],
};

export function LoadoutDetail({ weapon, onClose }: LoadoutDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-green-500 mb-2">{weapon.name}</h2>
              <p className="text-gray-400">Recommended Meta Loadout</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Weapon Preview */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 mb-6">
                <ImageWithFallback
                  src={weapon.image}
                  alt={weapon.name}
                  className="w-full h-full object-cover"
                />
                {weapon.isMeta && (
                  <Badge className="absolute top-3 left-3 bg-green-600 text-black">
                    META BUILD
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-100 mb-3">Weapon Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatDisplay label="Damage" value={weapon.damage} />
                    <StatDisplay label="Fire Rate" value={weapon.fireRate} />
                    <StatDisplay label="Accuracy" value={weapon.accuracy} />
                    <StatDisplay label="Range" value={weapon.range} />
                    <StatDisplay label="Mobility" value={weapon.mobility} />
                    <StatDisplay label="Control" value={Math.floor((weapon.accuracy + weapon.range) / 2)} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-black">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Loadout
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Attachments */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-gray-100 mb-4">Recommended Attachments</h3>
              <div className="space-y-4">
                {Object.entries(attachmentSlots).map(([slot, options]) => (
                  <div key={slot} className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">
                      {slot}
                    </label>
                    <Card className="bg-gray-800 border-gray-700 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-200">{options[0]}</span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-500 text-xs">
                        META
                      </Badge>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="text-green-500 mb-2">Pro Tip</h4>
                <p className="text-sm text-gray-300">
                  This loadout excels at medium range engagements. Use the {attachmentSlots.optic[0]} for quick target acquisition and the {attachmentSlots.barrel[0]} to maximize damage at distance.
                </p>
              </div>
            </Card>
          </div>

          {/* Alternative Builds */}
          <Card className="bg-gray-900 border-gray-800 p-6 mt-6">
            <h3 className="text-gray-100 mb-4">Alternative Builds</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <BuildPreset name="Close Quarters" description="Maximize mobility and fire rate" />
              <BuildPreset name="Long Range" description="Best for distance engagements" />
              <BuildPreset name="Stealth" description="Suppressed with low visibility" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatDisplay({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-800 p-3 rounded">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-gray-100">{value}</div>
    </div>
  );
}

function BuildPreset({ name, description }: { name: string; description: string }) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-4 hover:border-green-500/50 transition-colors cursor-pointer">
      <h4 className="text-gray-100 mb-1">{name}</h4>
      <p className="text-xs text-gray-400">{description}</p>
    </Card>
  );
}
