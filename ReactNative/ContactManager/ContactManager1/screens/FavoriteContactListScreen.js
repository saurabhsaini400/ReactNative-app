import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("contacts.db");

const FavoriteContactScreen = () => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavoriteContactsFromDatabase();
  }, []);

  const fetchFavoriteContactsFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts WHERE isFavorite = 1",
        [],
        (_, { rows }) => {
          const fetchedFavoriteContacts = rows._array;
          setFavoriteContacts(fetchedFavoriteContacts);
        },
        (_, error) => {
          console.log("Error fetching favorite contacts:", error);
        }
      );
    });
  };

  const renderContactItem = ({ item }) => {
    const handleContactPress = () => {
      navigation.navigate("UpdateContact", { contact: item });
    };

    return (
      <TouchableOpacity style={styles.contactItem} onPress={handleContactPress}>
        <View style={styles.contactItemContent}>
          <Text>{item.name}</Text>
          <Text>{item.phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Contact List</Text>
      <FlatList
        data={favoriteContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text>No favorite contacts available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contactItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactItemContent: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default FavoriteContactScreen;
