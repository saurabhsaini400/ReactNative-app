import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("contacts.db");
export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS abc (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, isFavorite INTEGER, photoUri TEXT)"
    );
  });
};

initializeDatabase();

export const insertContact = (contact) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO abc (name, phoneNumber, isFavorite, photoUri) VALUES (?, ?, ?, ?)",
      [
        contact.name,
        contact.phoneNumber,
        contact.isFavorite ? 1 : 0,
        contact.photoUri,
      ],
      (_, result) => {
        console.log("Contact inserted successfully.");
      },
      (_, error) => {
        console.log("Error inserting contact: ", error);
      }
    );
  });
};

export const updateContact = (contact) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE contacts1 SET name = ?, phoneNumber = ?, isFavorite = ?, photoUri = ? WHERE id = ?",
        [
          contact.name,
          contact.phoneNumber,
          contact.isFavorite ? 1 : 0,
          contact.photoUri,
          contact.id,
        ],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteContact = (contactId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM contacts1 WHERE id = ?",
        [contactId],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const fetchContactsFromDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM contacts1",
      [],
      (_, { rows }) => {
        const fetchedContacts = rows._array;
        insertContact(fetchedContacts);
      },
      (_, error) => {
        console.log("Error fetching contacts:", error);
      }
    );
  });
};

//edited
//edited
