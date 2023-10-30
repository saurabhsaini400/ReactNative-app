const initialState = {
  budgetEntries: [],
};

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BUDGET_ENTRY":
      return {
        ...state,
        budgetEntries: [...state.budgetEntries, action.payload],
      };
    case "DELETE_BUDGET_ENTRY":
      return {
        ...state,
        budgetEntries: state.budgetEntries.filter(
          (entry) => entry.itemName !== action.payload
        ),
      };
    case "UPDATE_BUDGET_ENTRY":
      return {
        ...state,
        budgetEntries: state.budgetEntries.map((entry) => {
          if (entry.itemName === action.payload.itemName) {
            return {
              ...entry,
              ...action.payload.updatedEntry,
            };
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};
