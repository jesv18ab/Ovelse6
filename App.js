import firebase from 'firebase';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import CarList from "./Components/CarList";
import AddCar from "./Components/AddCar";
import CarDetails from "./Components/CarDetails";
import { AntDesign } from '@expo/vector-icons';
import EditCar from "./Components/EditCar";

const StackNavigator = createStackNavigator(
    {
      CarList: { screen: CarList },
      CarDetails: { screen: CarDetails },
        EditCar:{screen: EditCar}
    },
    { initialRouteKey: 'CarList' }
);

const TabNavigator = createBottomTabNavigator({
  Main: {screen: StackNavigator,
      navigationOptions: {
          tabBarLabel:"Stack",
          tabBarIcon: ({ tintColor }) => (
              <AntDesign name="user" size={24} color={tintColor} />
          )
      },
  },
  Add: {screen: AddCar,
      navigationOptions: {
          tabBarLabel:"Addcar",
          tabBarIcon: ({ tintColor }) => (
              <AntDesign name="car" size={24} color={tintColor} />
          )
      },
  },
});
const AppContainer = createAppContainer(TabNavigator);


export default class App extends React.Component {
 UNSAFE_componentWillMount() {
    const firebaseConfig = {
        apiKey: "AIzaSyAfQzex-hK4ieEfDpN_0z8zqAnEAMAOOLg",
        authDomain: "ovelse6db.firebaseapp.com",
        databaseURL: "https://ovelse6db.firebaseio.com",
        projectId: "ovelse6db",
        storageBucket: "ovelse6db.appspot.com",
        messagingSenderId: "104869475429",
        appId: "1:104869475429:web:45e77b97515e809cb9c28c"        };

    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length ===0 ) {
    firebase.initializeApp(firebaseConfig);
}

 }
  render() {

    return <AppContainer />;
  }
}
