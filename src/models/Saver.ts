import type { Status } from "./Status";

export type SimpleCalculatorSave = {
  weapon: string;
  status: {
    [Status.STR]: number;
    [Status.DEX]: number;
    [Status.INT]: number;
    [Status.LUK]: number;
    [Status.ATK]: number;
    [Status.Mastery]: number;
  };
};

export const SimpleCalculatorSaver = {
  key: "simple-calculator-save",
  save: (data: SimpleCalculatorSave): string => {
    const str = JSON.stringify(data);
    localStorage.setItem(SimpleCalculatorSaver.key, str);
    return JSON.stringify(data);
  },
  load: (): SimpleCalculatorSave | undefined => {
    const str = localStorage.getItem(SimpleCalculatorSaver.key);
    if (str) {
      return JSON.parse(str) as SimpleCalculatorSave;
    }
    return undefined;
  },
} as const;
