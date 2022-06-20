import React, { useEffect, useRef, useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { INITIAL_LOCATION, INITIAL_REGION, useLocation } from '../hooks/useLocation';
import { Fab } from './Fab';
import { Loading } from './Loading';

export const Map = () => {
  const {
    hasLocation,
    initialLocation,
    userLocation,
    routeLines,
    getUserLocation,
    watchUserLocation,
    stopWatchUserLocation,
  } = useLocation();

  const [showPolyline, setShowPolyline] = useState<boolean>(true);

  const mapViewRef = useRef<MapView>();
  const followingUserPosition = useRef<boolean>(true);

  const centerPoition = async () => {
    const location = await getUserLocation();
    mapViewRef.current?.animateCamera({ center: location });

    followingUserPosition.current = true;
  };

  if (!hasLocation) {
    <Loading />;
  }

  useEffect(() => {
    if (
      initialLocation.latitude !== INITIAL_LOCATION.latitude ||
      initialLocation.longitude !== INITIAL_LOCATION.longitude
    ) {
      mapViewRef.current?.animateToRegion(
        {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: INITIAL_REGION.latitudeDelta,
          longitudeDelta: INITIAL_REGION.longitudeDelta,
        },
        1000,
      );
    }
  }, [initialLocation]);

  useEffect(() => {
    if (!followingUserPosition.current) {
      return;
    }
    mapViewRef.current?.animateCamera({ center: userLocation });
  }, [userLocation]);

  useEffect(() => {
    watchUserLocation();
    return () => {
      stopWatchUserLocation();
    };
  }, []);

  return (
    <>
      <MapView
        ref={(ref) => (mapViewRef.current = ref!)}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={INITIAL_REGION}
        onTouchStart={() => (followingUserPosition.current = false)}
      >
        {showPolyline && <Polyline coordinates={routeLines} strokeColor="black" strokeWidth={3} />}
      </MapView>
      <Fab
        iconName="brush-outline"
        onPress={() => {
          setShowPolyline((prevValue) => !prevValue);
        }}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
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
