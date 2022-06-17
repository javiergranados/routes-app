import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export const Map = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      console.log, // OK
      console.log, // Error
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    ></MapView>
  );
};
