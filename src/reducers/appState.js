import LocalHostChecker from '../CheckIfRunOnLocalHost';
import {
  GET_FILES_LIST_FULFILLED, GET_FILES_LIST_PENDING, GET_FILES_LIST_REJECTED,
  SELECT_STEP
} from '../actions/const';


const initialState = {
  apiURL: LocalHostChecker.check() ? "http://api.outputs.local" : "http://api.outputs.cinquiemecrayon.eu",
  selectedStep: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SELECT_STEP: {
      return Object.assign({}, state, {
        selectedStep: action.step,
        editedPage: action.page
      });
    }

    case GET_FILES_LIST_PENDING: {
      return Object.assign({}, state, {
        isLoadingData: true,
        loadingDataError: false
      });
    }

    case GET_FILES_LIST_FULFILLED: {

      return Object.assign({}, state, action.payload, {
        isLoadingData: false
      });
    }

    case GET_FILES_LIST_REJECTED: {
      return Object.assign({}, state, {
        isLoadingData: false,
        loadingDataError: true
      });
    }

    default: {
      return state;
    }
  }
}

