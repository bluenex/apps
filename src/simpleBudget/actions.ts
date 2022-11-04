import { v4 as uuidv4 } from "uuid";
import { DataSchema, ItemType, RecordItem } from "./types";

const getSum = (dataOfType: RecordItem[]) => {
  return dataOfType.reduce((acc, cur) => acc + cur.amount, 0);
};

const addRecord =
  (rtype: ItemType, amount: number, note: string) =>
  (prevState: DataSchema) => {
    const newItem = { id: uuidv4(), amount, note, isPinned: false };
    const updatedState = {
      ...prevState,
      [rtype]: [...prevState[rtype], newItem],
    };

    const diff = getSum(updatedState.income) - getSum(updatedState.expense);

    return {
      ...updatedState,
      diff,
    };
  };

const updateRecord =
  (rtype: ItemType, amount: number, note: string, id: string) =>
  (prevState: DataSchema) => {
    const updatedItem = prevState[rtype].find((x) => x.id === id);

    if (!updatedItem) return prevState;

    updatedItem.id = id;
    updatedItem.amount = amount;
    updatedItem.note = note;

    const diff = getSum(prevState.income) - getSum(prevState.expense);

    return {
      ...prevState,
      diff,
    };
  };

const moveUp = (rtype: ItemType, id: string) => (prevState: DataSchema) => {
  const updatedItem = prevState[rtype].find((x) => x.id === id);

  if (!updatedItem) return prevState;

  const updatedItemInd = prevState[rtype].indexOf(updatedItem);
  const swapItem = prevState[rtype][updatedItemInd - 1];

  return {
    ...prevState,
    [rtype]: [
      ...prevState[rtype].slice(0, updatedItemInd - 1),
      updatedItem,
      swapItem,
      ...prevState[rtype].slice(updatedItemInd + 1),
    ],
  };
};

const moveDown = (rtype: ItemType, id: string) => (prevState: DataSchema) => {
  const updatedItem = prevState[rtype].find((x) => x.id === id);

  if (!updatedItem) return prevState;

  const updatedItemInd = prevState[rtype].indexOf(updatedItem);
  const swapItem = prevState[rtype][updatedItemInd + 1];

  return {
    ...prevState,
    [rtype]: [
      ...prevState[rtype].slice(0, updatedItemInd),
      swapItem,
      updatedItem,
      ...prevState[rtype].slice(updatedItemInd + 2),
    ],
  };
};

const setPinStatus =
  (rtype: ItemType, id: string, status: boolean) => (prevState: DataSchema) => {
    const updatedItem = prevState[rtype].find((x) => x.id === id);

    if (!updatedItem) return prevState;

    updatedItem.isPinned = status;

    return prevState;
  };

const deleteRecord =
  (rtype: ItemType, id: string) => (prevState: DataSchema) => {
    const updatedItem = prevState[rtype].find((x) => x.id === id);

    if (!updatedItem) return prevState;

    const updatedItemInd = prevState[rtype].indexOf(updatedItem);
    const updatedState = {
      ...prevState,
      [rtype]: [
        ...prevState[rtype].slice(0, updatedItemInd),
        ...prevState[rtype].slice(updatedItemInd + 1),
      ],
    };

    const diff = getSum(updatedState.income) - getSum(updatedState.expense);

    return {
      ...updatedState,
      diff,
    };
  };

const deleteAllUnpinnedRecord = (prevState: DataSchema) => {
  const updatedState = {
    ...prevState,
    expense: prevState.expense.filter((x) => x.isPinned),
    income: prevState.income.filter((x) => x.isPinned),
  };

  const diff = getSum(updatedState.income) - getSum(updatedState.expense);

  return {
    ...updatedState,
    diff,
  };
};

export {
  addRecord,
  updateRecord,
  moveUp,
  moveDown,
  setPinStatus,
  deleteRecord,
  deleteAllUnpinnedRecord,
};
