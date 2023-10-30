import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addBudgetEntry } from "./actions";

const BudgetEntryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [plannedAmount, setPlannedAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");

  const handleSave = () => {
    dispatch(addBudgetEntry({ itemName, plannedAmount, actualAmount }));
    setItemName("");
    setPlannedAmount("");
    setActualAmount("");
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Item Name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        style={textInputStyle}
      />
      <TextInput
        label="Planned Amount"
        value={plannedAmount}
        onChangeText={(text) => setPlannedAmount(text)}
        keyboardType="numeric"
        style={textInputStyle}
      />
      <TextInput
        label="Actual Amount"
        value={actualAmount}
        onChangeText={(text) => setActualAmount(text)}
        keyboardType="numeric"
        style={textInputStyle}
      />
      <Button
        mode="contained"
        onPress={handleSave}
        style={{ marginBottom: 16, backgroundColor: "#4ab567" }}
        labelStyle={{ color: "white" }}
      >
        Save
      </Button>
      <Button
        onPress={() => navigation.navigate("BudgetEntryListing")}
        style={{ backgroundColor: "#e3a194" }}
        mode="contained"
      >
        Show Items
      </Button>
    </View>
  );
};

const textInputStyle = {
  marginBottom: 16,
  backgroundColor: "#EFEFEF",
  borderRadius: 8,
  paddingHorizontal: 12,
};

export default BudgetEntryScreen;
