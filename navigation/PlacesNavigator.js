import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

import Colors from '../constants/Colors'

const option = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        
        fontSize: 25
    },
    headerTintColor: '#ffffff',
    headerBackTitle: ' ',
};


const PlacesStack = createStackNavigator();
const PlacesNavigator = () => {
    return (
        <NavigationContainer>
            <PlacesStack.Navigator>
                <PlacesStack.Screen name="Places" component={PlacesListScreen} options={option} />
                <PlacesStack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={option} />
                <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} options={option} />
                <PlacesStack.Screen name="Map" component={MapScreen} options={option} />
            </PlacesStack.Navigator>
        </NavigationContainer>
    );
};

export default PlacesNavigator