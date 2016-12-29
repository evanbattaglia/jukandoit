import * as playerActions from '../actions/player';

export const STATE_INITIAL = 'initial';
export const STATE_LOADING = 'loading';
export const STATE_LOADED = 'loaded';
export const STATE_PLAYING = 'playing';
export const STATE_PAUSED = 'paused';

const initialStateplayer = {
  state: STATE_INITIAL,
  path: '',
  duration: null,
  time: null,
};

function player(state = initialStateplayer, action) {
  switch (action.type) {
    case playerActions.LOAD_SONG_REQUEST:
      // Ensures that if we load during a load, lastState will never be "loading" so
      // we will never go back to "loading" upon failure.
      return { ...state, state: STATE_LOADING, lastState: state.lastState || state.state };
    case playerActions.LOAD_SONG_SUCCESS:
      return { ...state, state: STATE_LOADED, lastState: null, path: action.path };
    case playerActions.LOAD_SONG_FAILURE:
      return { ...state, state: state.lastState, lastState: null }; // path is unchanged. revert.
  }
  return state;
}

export default player;
