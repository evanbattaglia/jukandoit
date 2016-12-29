import * as playerActions from '../actions/player';

export const STATUS_INITIAL = 'initial';
export const STATUS_LOADED = 'loaded'; // TODO rename to stopped
export const STATUS_PLAYING = 'playing';
export const STATUS_PAUSED = 'paused';

const initialStatePlayer = {
  status: STATUS_INITIAL,
  path: '',
  duration: null,
  time: null,

  loading: false,
  loadingPath: null,
};

function player(state = initialStatePlayer, action) {
  switch (action.type) {
    case playerActions.LOAD_SONG_REQUEST:
      // Ensures that if we load during a load, lastStatus will never be "loading" so
      // we will never go back to "loading" upon failure.
      return { ...state, loading: true, loadingPath: action.path }
    case playerActions.LOAD_SONG_SUCCESS:
      return { ...state,
        path: action.path, status: STATUS_PLAYING,
        loading: false, loadingPath: null,
      };
    case playerActions.LOAD_SONG_FAILURE:
      return { ...state, loading: false, loadingPath: null };
    case playerActions.PAUSE_SONG:
      return { ...state, status: STATUS_PAUSED };
    case playerActions.STOP_SONG:
      return { ...state, status: STATUS_LOADED };
    case playerActions.PLAY_SONG:
      return { ...state, status: STATUS_PLAYING };
  }
  return state;
}

export default player;
