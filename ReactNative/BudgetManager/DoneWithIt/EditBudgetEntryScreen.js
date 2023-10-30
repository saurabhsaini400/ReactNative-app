import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { updateBudgetEntry } from "./actions";

const EditBudgetEntryScreen = ({ navigation, route }) => {
  const { itemName } = route.params;
  const budgetEntry = useSelector((state) =>
    state.budgetEntries.find((entry) => entry.itemName === itemName)
  );
  const dispatch = useDispatch();
  const [plannedAmount, setPlannedAmount] = useState(budgetEntry.plannedAmount);
  const [actualAmount, setActualAmount] = useState(budgetEntry.actualAmount);

  const handleUpdate = () => {
    dispatch(updateBudgetEntry(itemName, { plannedAmount, actualAmount }));
    navigation.goBack();
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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
        onPress={handleUpdate}
        style={{ marginBottom: 10, backgroundColor: "#4ab567" }}
      >
        Update
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

export default EditBudgetEntryScreen;
