import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateContact, deleteContact } from "../database";

const UpdateContactScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { contact } = route.params;

  useEffect(() => {
    setName(contact.name);
    setPhoneNumber(contact.phoneNumber);
  }, []);

  const handleUpdateContact = async () => {
    try {
      const updatedContact = {
        ...contact,
        name,
        phoneNumber,
      };

      const rowsAffected = await updateContact(updatedContact);
      console.log("Updated rows:", rowsAffected);

      navigation.goBack();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      Alert.alert(
        "Delete Contact",
        "Are you sure you want to delete this contact?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", onPress: () => deleteContact(contact.id) },
        ]
      );
      const rowsAffected = await deleteContact(contact.id);
      console.log("Deleted rows:", rowsAffected);

      navigation.goBack();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }

    // navigation.goBack();
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>
        Update Contact
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          marginHorizontal: 16,
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{
          marginHorizontal: 16,
          marginBottom: 8,
          padding: 8,
          borderWidth: 1,
        }}
      />
      <Button title="Update" onPress={handleUpdateContact} />
      <Button title="Delete" onPress={handleDeleteContact} color="red" />
    </View>
  );
};

export default UpdateContactScreen;
