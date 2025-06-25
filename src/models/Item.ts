export const Weapon = {
  OneHandedSword: "OneHandedSword",
  OneHandedAxe: "OneHandedAxe",
  TwoHandedSword: "TwoHandedSword",
  TwoHandedAxe: "TwoHandedAxe",
  Spear: "Spear",
  Polearm: "Polearm",
  Dagger: "Dagger",
  ThrowingStar: "ThrowingStar",
  Bow: "Bow",
  Crossbow: "Crossbow",
  Knuckle: "Knuckle",
  Gun: "Gun",
} as const;
export type Weapon = (typeof Weapon)[keyof typeof Weapon];

export const weapons = Object.values(Weapon);
export const weaponMap: Record<Weapon, string> = {
  [Weapon.OneHandedSword]: "單手劍",
  [Weapon.OneHandedAxe]: "單手斧/棍",
  [Weapon.TwoHandedSword]: "雙手劍",
  [Weapon.TwoHandedAxe]: "雙手斧/棍",
  [Weapon.Spear]: "槍",
  [Weapon.Polearm]: "矛",
  [Weapon.Dagger]: "短劍",
  [Weapon.ThrowingStar]: "鏢",
  [Weapon.Bow]: "弓",
  [Weapon.Crossbow]: "弩",
  [Weapon.Knuckle]: "指虎",
  [Weapon.Gun]: "手槍",
};
