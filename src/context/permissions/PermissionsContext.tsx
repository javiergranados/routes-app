import React, { createContext, useEffect, useReducer } from 'react';
import { AppState, Platform } from 'react-native';
import { PermissionsState, PermissionsContextProps } from './PermissionsTypes';
import { permissionsReducer } from './PermissionsReducer';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';

export const PermissionsContext = createContext({} as PermissionsContextProps);

const PERMISSIONS_INITIAL_STATE: PermissionsState = {
  locationStatus: 'unavailable',
};

export const PermissionsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(permissionsReducer, PERMISSIONS_INITIAL_STATE);

  const askLocationPermission = async () => {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const locationStatus: PermissionStatus = await request(permission);

    if (locationStatus === 'blocked') {
      openSettings();
    }
    dispatch({ type: 'ASK_LOCATION_PERMISSION', payload: locationStatus });
  };

  const checkLocationPermission = async () => {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const locationStatus: PermissionStatus = await check(permission);

    dispatch({ type: 'CHECK_LOCATION_PERMISSION', payload: locationStatus });
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PermissionsContext.Provider
      value={{
        ...state,
        askLocationPermission,
        checkLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
