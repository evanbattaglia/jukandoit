import * as playerActions from '../actions/player';

export const STATUS_INITIAL = 'initial';
export const STATUS_LOADING = 'loading';
export const STATUS_LOADED = 'loaded';
export const STATUS_PLAYING = 'playing';
export const STATUS_PAUSED = 'paused';

const initialStatePlayer = {
  status: STATUS_INITIAL,
  path: '',
  duration: null,
  time: null,
};

function player(state = initialStatePlayer, action) {
  switch (action.type) {
    case playerActions.LOAD_SONG_REQUEST:
      // Ensures that if we load during a load, lastStatus will never be "loading" so
      // we will never go back to "loading" upon failure.
      return { ...state, status: STATUS_LOADING, lastStatus: state.lastStatus || state.status };
    case playerActions.LOAD_SONG_SUCCESS:
      return { ...state, status: STATUS_PLAYING, lastStatus: null, path: action.path };
    case playerActions.LOAD_SONG_FAILURE:
      return { ...state, status: state.lastStatus, lastStatus: null }; // path is unchanged. revert.
  }
  return state;
}

export default player;
