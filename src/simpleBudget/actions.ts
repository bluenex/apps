import { v4 as uuidv4 } from "uuid";
import { DataSchema, ItemType, RecordItem } from "./types";

// -- helpers
export const getSum = (dataOfType: RecordItem[]) => {
  return dataOfType.reduce((acc, cur) => acc + cur.amount, 0);
};

const getDiff = (state: DataSchema) => {
  return getSum(state.income) - getSum(state.expense);
};

const sortData = (dataOfType: RecordItem[]) => {
  return dataOfType.sort((a, b) => {
    if (a.isPinned && b.isPinned) return 0;
    if (a.isPinned) return -1;
    if (b.isPinned) return 1;
    return 0;
  });
};

const swapItems = (dataOfType: RecordItem[], from: number, to: number) => {
  if (
    from < 0 ||
    from > dataOfType.length - 1 ||
    to < 0 ||
    to > dataOfType.length - 1
  ) {
    return dataOfType;
  }

  const copied = dataOfType.slice();
  const copiedFrom = dataOfType[from];
  copied[from] = dataOfType[to];
  copied[to] = copiedFrom;

  return copied;
};

// -- actions on data
const addRecord =
  (rtype: ItemType, amount: number, note: string) =>
  (prevState: DataSchema) => {
    const newItem = { id: uuidv4(), amount, note, isPinned: false };
    const updatedState = {
      ...prevState,
      [rtype]: sortData([...prevState[rtype], newItem]),
    };

    const diff = getDiff(updatedState);

    return {
      ...updatedState,
      diff,
    };
  };

const updateRecord =
  (rtype: ItemType, amount: number, note: string, id: string) =>
  (prevState: DataSchema) => {
    const updatedState = {
      ...prevState,
      [rtype]: sortData(
        prevState[rtype].reduce((acc, cur) => {
          if (cur.id === id) {
            return [
              ...acc,
              {
                ...cur,
                amount,
                note,
              },
            ];
          }

          return [...acc, cur];
        }, [] as RecordItem[]),
      ),
    };

    const diff = getDiff(updatedState);

    return {
      ...updatedState,
      diff,
    };
  };

const moveRecord =
  (rtype: ItemType, id: string, direction: "up" | "down") =>
  (prevState: DataSchema) => {
    const updatedItem = prevState[rtype].find((x) => x.id === id);

    if (!updatedItem) return prevState;

    const updatedItemInd = prevState[rtype].indexOf(updatedItem);
    const swapped = swapItems(
      prevState[rtype],
      updatedItemInd,
      direction === "up" ? updatedItemInd - 1 : updatedItemInd + 1,
    );

    return {
      ...prevState,
      [rtype]: swapped,
    };
  };

const pinRecord =
  (rtype: ItemType, id: string, status: boolean) => (prevState: DataSchema) => {
    const updatedState = {
      ...prevState,
      [rtype]: sortData(
        prevState[rtype].reduce((acc, cur) => {
          if (cur.id === id) {
            return [
              ...acc,
              {
                ...cur,
                isPinned: status,
              },
            ];
          }

          return [...acc, cur];
        }, [] as RecordItem[]),
      ),
    };

    return updatedState;
  };

const deleteRecord =
  (rtype: ItemType, id: string) => (prevState: DataSchema) => {
    const updatedItem = prevState[rtype].find((x) => x.id === id);

    if (!updatedItem) return prevState;

    const updatedItemInd = prevState[rtype].indexOf(updatedItem);
    const removed = prevState[rtype].slice();
    removed.splice(updatedItemInd, 1);

    const updatedState = {
      ...prevState,
      [rtype]: removed,
    };

    const diff = getDiff(updatedState);

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

  const diff = getDiff(updatedState);

  return {
    ...updatedState,
    diff,
  };
};

export {
  addRecord,
  updateRecord,
  moveRecord,
  pinRecord,
  deleteRecord,
  deleteAllUnpinnedRecord,
};
