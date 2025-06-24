import { Weapon } from "./Item";
import { Status } from "./Status";

type Damage = {
  max: number;
  min: number;
};

const weaponPrimaryEffects: Record<Weapon, Damage> = {
  [Weapon.OneHandedSword]: {
    max: 4.2,
    min: 4.2,
  },
  [Weapon.OneHandedAxe]: {
    max: 4.8,
    min: 3.6,
  },
  [Weapon.TwoHandedSword]: {
    max: 4.8,
    min: 4.8,
  },
  [Weapon.TwoHandedAxe]: {
    max: 5.2,
    min: 4,
  },
  [Weapon.Spear]: {
    max: 5.1,
    min: 3.6,
  },
  [Weapon.Polearm]: {
    max: 5.2,
    min: 3.5,
  },
  [Weapon.Dagger]: {
    max: 4.2,
    min: 3.6,
  },
  [Weapon.ThrowingStar]: {
    max: 3.6,
    min: 3.6,
  },
  [Weapon.Bow]: {
    max: 3.4,
    min: 3.4,
  },
  [Weapon.Crossbow]: {
    max: 3.6,
    min: 3.6,
  },
  [Weapon.Knuckle]: {
    max: 4.8,
    min: 4.8,
  },
  [Weapon.Gun]: {
    max: 3.6,
    min: 3.6,
  },
};

type WeaponEffect = {
  primary: Status;
  secondary: Status[];
};

export const getWeaponEffect = (weapon: Weapon): WeaponEffect => {
  switch (weapon) {
    case Weapon.OneHandedSword:
    case Weapon.OneHandedAxe:
    case Weapon.TwoHandedSword:
    case Weapon.TwoHandedAxe:
    case Weapon.Spear:
    case Weapon.Polearm:
    case Weapon.Knuckle:
      return {
        primary: Status.STR,
        secondary: [Status.DEX],
      };
    case Weapon.Dagger:
    case Weapon.ThrowingStar:
      return {
        primary: Status.LUK,
        secondary: [Status.STR, Status.DEX],
      };
    case Weapon.Bow:
    case Weapon.Crossbow:
    case Weapon.Gun:
      return {
        primary: Status.DEX,
        secondary: [Status.STR],
      };
  }
};

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export const calculateDamage = (
  weapon: Weapon,
  status: Record<Status, number>,
) => {
  const { primary, secondary } = getWeaponEffect(weapon);
  const maxPrimary = status[primary] * weaponPrimaryEffects[weapon].max;
  const minPrimary = status[primary] * weaponPrimaryEffects[weapon].min;
  const secondarySum = sum(secondary.map((s) => status[s]));
  const mastery = status[Status.Mastery] / 100;
  const maxDamage = ((maxPrimary + secondarySum) * status[Status.ATK]) / 100;
  const minDamage =
    ((minPrimary * 0.9 * mastery + secondarySum) * status[Status.ATK]) / 100;
  return {
    max: Math.floor(maxDamage),
    min: Math.floor(minDamage),
  };
};
