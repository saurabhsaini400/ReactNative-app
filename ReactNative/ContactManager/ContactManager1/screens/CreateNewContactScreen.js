import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { insertContact } from "../database";

const CreateNewContactScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoUri, setPhotoUri] = useState("");

  const handleSaveContact = async () => {
    try {
      const contact = {
        name,
        phoneNumber,
        isFavorite: false,
        photoUri,
      };

      const insertedId = await insertContact(contact);
      console.log("Inserted contact ID:", insertedId);

      setName("");
      setPhoneNumber("");
      setPhotoUri("");
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!imageResult.canceled) {
        const { assets } = imageResult;
        if (assets && assets.length > 0) {
          setPhotoUri(assets[0].uri);
        }
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Contact</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImageUpload}
      >
        {photoUri ? (
          <Image style={styles.contactImage} source={{ uri: photoUri }} />
        ) : (
          <Text style={styles.uploadImageText}>Upload Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSaveContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadImageText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  input: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
});

export default CreateNewContactScreen;
//edited
//edited
