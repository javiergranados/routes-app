import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import { PermissionsContext } from '../context';
import { Loading } from '../components/Loading';

export type RootStackParamList = {
  MapScreen: undefined;
  PermissionsScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { locationStatus } = useContext(PermissionsContext);

  if (locationStatus === 'unavailable') {
    return <Loading />;
  }
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {locationStatus === 'granted' ? (
        <RootStack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <RootStack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default StackNavigator;
