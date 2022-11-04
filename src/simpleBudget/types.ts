export type ItemType = "income" | "expense";
export type ItemTypeWithHidden = ItemType | "hidden";

export type RecordItem = {
  id: string;
  amount: number;
  note: string;
  isPinned: boolean;
};

export type DataSchema = {
  expense: RecordItem[];
  income: RecordItem[];
  /** this is calculated on update */
  diff?: number;
};
