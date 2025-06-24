export const Status = {
  STR: "str",
  DEX: "dex",
  INT: "int",
  LUK: "luk",
  ATK: "atk",
  Mastery: "mastery",
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export const characterStatuses = [
  Status.STR,
  Status.DEX,
  Status.INT,
  Status.LUK,
];
export const statusMap: Record<Status, string> = {
  [Status.STR]: "力量",
  [Status.DEX]: "敏捷",
  [Status.INT]: "智力",
  [Status.LUK]: "幸運",
  [Status.ATK]: "攻擊力",
  [Status.Mastery]: "熟練度",
};
