import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { Swipeable } from "react-native-gesture-handler";

const db = SQLite.openDatabase("contacts.db");

const ContactListScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchContactsFromDatabase();
  }, []);

  const fetchContactsFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM abc",
        [],
        (_, { rows }) => {
          const fetchedContacts = rows._array;
          setContacts(fetchedContacts);
        },
        (_, error) => {
          console.log("Error fetching contacts:", error);
        }
      );
    });
  };

  const deleteContact = (contactId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM abc WHERE id = ?",
        [contactId],
        () => {
          console.log("Contact deleted successfully");
          fetchContactsFromDatabase();
        },
        (_, error) => {
          console.log("Error deleting contact:", error);
        }
      );
    });
  };

  const toggleFavoriteContact = (contactId, isFavorite) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE abc SET isFavorite = ? WHERE id = ?",
        [!isFavorite, contactId],
        () => {
          console.log("Contact favorite status updated successfully");
          fetchContactsFromDatabase();
        },
        (_, error) => {
          console.log("Error updating contact favorite status:", error);
        }
      );
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteContact(item.id) },
      ]
    );
  };
  const renderContactItem = ({ item }) => {
    const handleToggleFavorite = () => {
      toggleFavoriteContact(item.id, item.isFavorite);
    };

    return (
      <Swipeable renderLeftActions={leftSwipe}>
        <View style={styles.contactItem}>
          {item.photoUri ? (
            <Image
              style={styles.contactImage}
              source={{ uri: item.photoUri }}
            />
          ) : (
            <View style={styles.contactImagePlaceholder} />
          )}
          <TouchableOpacity
            style={styles.contactItemContent}
            onPress={() =>
              navigation.navigate("UpdateContact", { contact: item })
            }
          >
            <Text>{item.name}</Text>
            <Text>{item.phoneNumber}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: item.isFavorite ? "#FFCC00" : "#ccc" },
            ]}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {item.isFavorite ? "Unfavorite" : "Favorite"}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity> */}
        </View>
      </Swipeable>
    );
  };

  const handleAddContact = () => {
    navigation.navigate("CreateNewContact");
  };
  const handleUpdateContact = () => {
    navigation.navigate("UpdateContact");
  };

  const handleSearch = () => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchContactsFromDatabase();
  };
  const leftSwipe = () => {
    return (
      <View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleUpdateContact}
        >
          <Text style={styles.deleteButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearSearch}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text>No contacts available</Text>}
        contentContainerStyle={styles.contentContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#FFCC00",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  searchButtonText: {
    color: "#FFF",
  },
  clearButton: {
    backgroundColor: "#FF3333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    color: "#FFF",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: "#ccc",
  },
  contactItemContent: {
    flex: 1,
  },
  favoriteButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  favoriteButtonText: {
    color: "#FFF",
  },
  deleteButton: {
    backgroundColor: "#FF3333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFF",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  contentContainer: {
    flexGrow: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FFCC00",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ContactListScreen;
//edited
