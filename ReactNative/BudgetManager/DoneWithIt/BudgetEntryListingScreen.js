import React from "react";
import { View, Text } from "react-native";
import { Button, List, Divider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { deleteBudgetEntry } from "./actions";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BudgetEntryListingScreen = () => {
  const budgetEntries = useSelector((state) => state.budgetEntries);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = (itemName) => {
    dispatch(deleteBudgetEntry(itemName));
  };

  const handleEdit = (itemName) => {
    navigation.navigate("EditBudgetEntry", { itemName });
  };

  return (
    <View style={{ padding: 16 }}>
      {budgetEntries.length === 0 ? (
        <Text>No item entry</Text>
      ) : (
        <View>
          {budgetEntries.map((item, index) => (
            <View key={item.itemName}>
              <List.Item
                title={item.itemName}
                description={`Planned Amount: ${item.plannedAmount}\nActual Amount: ${item.actualAmount}`}
                left={() => (
                  <MaterialCommunityIcons
                    name="shopping"
                    size={24}
                    color="black"
                  />
                )}
                right={() => (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      onPress={() => handleEdit(item.itemName)}
                      style={{ marginRight: 8, backgroundColor: "#4ab567" }}
                      mode="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      onPress={() => handleDelete(item.itemName)}
                      mode="contained"
                      style={{ backgroundColor: "#e3a194" }}
                    >
                      Delete
                    </Button>
                  </View>
                )}
              />
              {index !== budgetEntries.length - 1 && <Divider />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default BudgetEntryListingScreen;
