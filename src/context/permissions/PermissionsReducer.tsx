import { PermissionsActions, PermissionsState } from './PermissionsTypes';

const permissionsReducer = (state: PermissionsState, action: PermissionsActions): PermissionsState => {
  switch (action.type) {
    case 'ASK_LOCATION_PERMISSION':
      return {
        ...state,
        locationStatus: action.payload,
      };
    case 'CHECK_LOCATION_PERMISSION':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export { permissionsReducer };
