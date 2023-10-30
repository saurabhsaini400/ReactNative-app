export const addBudgetEntry = (entry) => {
  return {
    type: "ADD_BUDGET_ENTRY",
    payload: entry,
  };
};

export const deleteBudgetEntry = (itemName) => {
  return {
    type: "DELETE_BUDGET_ENTRY",
    payload: itemName,
  };
};

export const updateBudgetEntry = (itemName, updatedEntry) => {
  return {
    type: "UPDATE_BUDGET_ENTRY",
    payload: {
      itemName,
      updatedEntry,
    },
  };
};
