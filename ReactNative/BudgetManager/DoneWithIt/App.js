import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BudgetEntryScreen from "./BudgetEntryScreen";
import BudgetEntryListingScreen from "./BudgetEntryListingScreen";
import EditBudgetEntryScreen from "./EditBudgetEntryScreen";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BudgetEntry">
            <Stack.Screen
              name="BudgetEntry"
              component={BudgetEntryScreen}
              options={{ title: "Enter Item Budget" }}
            />
            <Stack.Screen
              name="BudgetEntryListing"
              component={BudgetEntryListingScreen}
              options={{ title: "List of Items" }}
            />
            <Stack.Screen
              name="EditBudgetEntry"
              component={EditBudgetEntryScreen}
              options={{ title: "Edit Budget" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
