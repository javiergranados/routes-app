import React from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Loading } from './Loading';

export const Map = () => {
  const { hasLocation, location } = useLocation();

  if (!hasLocation) {
    <Loading />;
  }
  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      region={{
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
