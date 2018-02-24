import {
  GET_PROJECT_DATA_FULFILLED,
  GET_PROJECT_DATA_PENDING,
  GET_PROJECT_DATA_REJECTED,
  SET_PROJECT_NAME,
  SET_PROJECT_PASSWORD,
  SET_NUMBER_OF_VERSIONS,
  SAVE_PROJECT_DATA,
  STORE_BACKGROUNDS,
  STORE_DEVICES,
  SET_BREAKPOINT_WIDTH,
  SET_VARIANT_FILENAME,
  SET_VARIANT_IMAGE_SIZE,
  SET_VARIANT_DENSITY,
  EDIT_PAGE_NAME,
  ADD_NEW_PAGE,
  LOGOUT
} from '../actions/const';

const initialState = {
  isLoadingData: true,
  loadingDataError: false,
  dataReady: false,
  dataSaved: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_PROJECT_DATA_PENDING: {
      const nextState = Object.assign({}, state, {
        isLoadingData: true,
        loadingDataError: false
      });
      return nextState;
    }

    case GET_PROJECT_DATA_FULFILLED: {
      const nextState = Object.assign({}, state, action.payload, {
        isLoadingData: false
      });
      return nextState;
    }

    case GET_PROJECT_DATA_REJECTED: {
      const nextState = Object.assign({}, state, {
        isLoadingData: false,
        loadingDataError: true
      });
      return nextState;
    }

    case SET_PROJECT_NAME: {
      const nextState = Object.assign({}, state, {
        name: action.projectName,
        dataSaved: false
      });
      return nextState;
    }

    case SET_PROJECT_PASSWORD: {
      const nextState = Object.assign({}, state, {
        password: action.projectPassword,
        dataSaved: false
      });
      return nextState;
    }

    case SAVE_PROJECT_DATA: {
      const nextState = Object.assign({}, state, action.saveData, {
        dataSaved: true
      });
      return nextState;
    }

    case SET_NUMBER_OF_VERSIONS: {
      const nextState = Object.assign({}, state, {
        numberOfVersions: action.number,
        dataSaved: false
      });
      return nextState;
    }

    case STORE_BACKGROUNDS: {
      const nextState = Object.assign({}, state, {
        backgrounds: action.backgrounds,
        dataSaved: true
      });
      return nextState;
    }

    case STORE_DEVICES: {
      const nextState = Object.assign({}, state, {
        devices: action.devices,
        dataSaved: true
      });
      return nextState;
    }
    case SET_BREAKPOINT_WIDTH: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.page].devices[action.device].bWidth = action.bWidth;
      return Object.assign({}, stateCopy);
    }

    case SET_VARIANT_FILENAME: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.page].devices[action.device].designs[action.variant].fileName = action.fileName;
      return Object.assign({}, stateCopy);
    }

    case SET_VARIANT_DENSITY: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.page].devices[action.device].designs[action.variant].density = action.density;
      return Object.assign({}, stateCopy);
    }

    case SET_VARIANT_IMAGE_SIZE: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.page].devices[action.device].designs[action.variant][action.dimension] = action.value;
      return Object.assign({}, stateCopy);
    }

    case EDIT_PAGE_NAME: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.newName] = Object.assign(stateCopy.pages[action.oldName]);
      delete stateCopy.pages[action.oldName];
      return Object.assign({}, stateCopy);
    }

    case ADD_NEW_PAGE: {
      const stateCopy = Object.assign(state);
      stateCopy.pages[action.name] = action.emptyPage;
      return Object.assign({}, stateCopy);
    }

    case LOGOUT: {
      return Object.assign({}, state, {
        pages: undefined,
        background: undefined,
        device: undefined,
        messages: undefined,
        dataReady: false,
        loadingDataError: true
      });
    }

    default: {
      return state;
    }
  }
}

