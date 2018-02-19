import {
  SELECT_STEP
} from '../actions/const';

const initialState = {
  selectedStep: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SELECT_STEP: {
      return Object.assign({}, state, {
        selectedStep: action.step
      });
    }

    default: {
      return state;
    }
  }
}

