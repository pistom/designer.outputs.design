import {
  GET_PROJECT_DATA_FULFILLED,
  GET_PROJECT_DATA_PENDING,
  GET_PROJECT_DATA_REJECTED,
  SET_PROJECT_NAME,
  SET_PROJECT_PASSWORD,
  SET_NUMBER_OF_VERSIONS,
  SAVE_PROJECT_DATA,
  STORE_BACKGROUNDS,
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

    default: {
      return state;
    }
  }
}

