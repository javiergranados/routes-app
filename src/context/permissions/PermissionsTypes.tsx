import { PermissionStatus } from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export interface PermissionsContextProps extends PermissionsState {
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

export type PermissionsActions =
  | { type: 'ASK_LOCATION_PERMISSION'; payload: PermissionStatus }
  | { type: 'CHECK_LOCATION_PERMISSION'; payload: PermissionStatus };
