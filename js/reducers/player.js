import * as playerActions from '../actions/player';

const STATE_INITIAL = 'initial';
const STATE_LOADING = 'loading';
const STATE_LOADED = 'loaded';

const initialStateplayer = {
  state: STATE_INITIAL,
  path: '',
};

function player(state = initialStateplayer, action) {
      console.log("looks like we got a ", action, "on our hands");
  switch (action.type) {
    case playerActions.LOAD_SONG_REQUEST:
      // Ensures that if we load during a load, lastState will never be "loading" so
      // we will never go back to "loading" upon failure.
      return { ...state, state: 'loading', lastState: state.lastState || state.state };
    case playerActions.LOAD_SONG_SUCCESS:
      return { ...state, state: 'loaded', lastState: null, path: action.path };
    case playerActions.LOAD_SONG_FAILURE:
      return { ...state, state: state.lastState, lastState: null }; // path is unchanged. revert.
  }
  return state;
}

export default player;
