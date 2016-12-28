import * as controlActions from '../actions/control';
import { playSongFromDropbox } from '../lib/music_control';

const initialStateControl = {
  state: 'initial', // TODO: enum or something, shared with view
};

function control(state = initialStateControl, action) {
  switch (action.type) {
    case controlActions.LOAD_SONG:
      // TODO: redux-thunkified actions
      playSongFromDropbox(action.path);
      return { ...state, state: 'loading' };
  }
  return state;
}

export default control;
