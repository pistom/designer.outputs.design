import LocalHostChecker from '../CheckIfRunOnLocalHost';
import { SELECT_STEP } from '../actions/const';


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

    default: {
      return state;
    }
  }
}

