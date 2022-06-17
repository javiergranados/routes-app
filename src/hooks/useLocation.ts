import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/map';

const INITIAL_LOCATION: Location = {
  longitude: 40.4165,
  latitude: -3.70256,
};

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>(INITIAL_LOCATION);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setHasLocation(true);
      },
      console.log, // error
      { enableHighAccuracy: true },
    );
  }, []);

  return { hasLocation, location };
};

export { useLocation };
