import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';

export type RootStackParamList = {
  MapScreen: undefined;
  PermissionsScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <RootStack.Screen name="MapScreen" component={MapScreen} />
      <RootStack.Screen name="PermissionsScreen" component={PermissionsScreen} />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
