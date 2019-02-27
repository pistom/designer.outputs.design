import {
  GET_MESSAGES_FULFILLED,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_REJECTED,
  ADD_MESSAGE
} from '../actions/const';

const initialState = {
  areLoadingMessages: true,
  loadingMessagesError: false,
  messages: [],
  comments: {},
  designIsAccepted: false,
  addingCommentMode: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES_PENDING: {
      const nextState = Object.assign({}, state, {
        areLoadingMessages: true,
        loadingMessagesError: false
      });
      return nextState;
    }

    case GET_MESSAGES_FULFILLED: {
      const messages = action.payload.messages;
      const designIsAccepted = messages.some((message) => (
        message.type === 'accept'
      ));
      const nextState = Object.assign({}, state, action.payload, {
        areLoadingMessages: false,
        designIsAccepted
      });
      return nextState;
    }

    case GET_MESSAGES_REJECTED: {
      const nextState = Object.assign({}, state, {
        areLoadingMessages: false,
        loadingMessagesError: true
      });
      return nextState;
    }

    case ADD_MESSAGE: {
      const stateCopy = Object.assign(state);
      stateCopy.messages.push({
        "date": action.date,
        "time": action.time,
        "type": "designer",
        "content": action.message
      });
      return Object.assign({}, stateCopy);
    }

    default: {
      return state;
    }
  }
}
