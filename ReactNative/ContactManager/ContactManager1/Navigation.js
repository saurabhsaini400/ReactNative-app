import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import ContactListScreen from "./screens/ContactListScreen";
import CreateNewContactScreen from "./screens/CreateNewContactScreen";
import UpdateContactScreen from "./screens/UpdateContactScreen";
import FavoriteContactListScreen from "./screens/FavoriteContactListScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ContactList" component={ContactListScreen} />
    <Stack.Screen name="CreateNewContact" component={CreateNewContactScreen} />
    <Stack.Screen name="UpdateContact" component={UpdateContactScreen} />
  </Stack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="ContactStack">
      <Drawer.Screen name="ContactListScreen" component={ContactStack} />
      <Drawer.Screen
        name="FavoriteContactScreen"
        component={FavoriteContactListScreen}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigation;
