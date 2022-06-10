import React, { createContext, useReducer } from 'react';
import { PermissionsState, PermissionsContextProps } from './PermissionsTypes';
import { permissionsReducer } from './PermissionsReducer';
import { Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

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

    dispatch({ type: 'ASK_LOCATION_PERMISSION', payload: locationStatus });
  };

  const checkLocationPermission = () => dispatch({ type: 'CHECK_LOCATION_PERMISSION' });

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
