import { useState, useEffect, useRef } from 'react';
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
  const [userLocation, setUserLocation] = useState<Location>(INITIAL_LOCATION);
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const watchPositionId = useRef<number>();
  const isMounted = useRef<boolean>(true);

  const getUserLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(coords);
        },
        (err) => reject({ err }),
        { enableHighAccuracy: true },
      );
    });
  };

  const watchUserLocation = () => {
    watchPositionId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) {
          return;
        }
        setUserLocation(coords);
        setRouteLines((prevRouteLines) => [...prevRouteLines, coords]);
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, distanceFilter: 10 },
    );
  };

  const stopWatchUserLocation = () => {
    if (watchPositionId.current) {
      Geolocation.clearWatch(watchPositionId.current);
    }
  };

  useEffect(() => {
    getUserLocation().then((location) => {
      if (!isMounted.current) {
        return;
      }
      setInitialLocation(location);
      setUserLocation(location);
      setRouteLines((prevRouteLines) => [...prevRouteLines, location]);
      setHasLocation(true);
    });
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    hasLocation,
    initialLocation,
    userLocation,
    routeLines,
    getUserLocation,
    watchUserLocation,
    stopWatchUserLocation,
  };
};

export { useLocation };
