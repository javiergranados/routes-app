import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location, Region } from '../interfaces/map';

export const INITIAL_LOCATION: Location = {
  longitude: 40.4165,
  latitude: -3.70256,
};

export const INITIAL_REGION: Region = {
  ...INITIAL_LOCATION,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [initialLocation, setInitialLocation] = useState<Location>(INITIAL_LOCATION);

  const getUserLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => reject({ err }),
        { enableHighAccuracy: true },
      );
    });
  };

  useEffect(() => {
    getUserLocation().then((location) => {
      setInitialLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      setHasLocation(true);
    });
  }, []);

  return { hasLocation, initialLocation, getUserLocation };
};

export { useLocation };
