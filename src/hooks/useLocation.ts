import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/map';

const INITIAL_LOCATION: Location = {
  longitude: 40.4165,
  latitude: -3.70256,
};

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Location>(INITIAL_LOCATION);

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
      setUserLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      setHasLocation(true);
    });
  }, []);

  return { hasLocation, userLocation, getUserLocation };
};

export { useLocation };
