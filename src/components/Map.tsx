import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Fab } from './Fab';
import { Loading } from './Loading';

export const Map = () => {
  const mapViewRef = useRef<MapView>();
  const { hasLocation, userLocation, getUserLocation } = useLocation();

  const centerPoition = async () => {
    const location = await getUserLocation();
    mapViewRef.current?.animateCamera({ center: location });
  };

  if (!hasLocation) {
    <Loading />;
  }
  return (
    <>
      <MapView
        ref={(ref) => (mapViewRef.current = ref!)}
        style={{ flex: 1 }}
        showsUserLocation
        region={{
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Fab
        iconName="locate-outline"
        onPress={centerPoition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
