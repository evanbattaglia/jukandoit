import controlActions from '../actions/control';

const initialStateControl = {
  state: 'initial', // TODO: enum or something, shared with view
};
function control(state = initialStateControl, action) {
  switch (action) {
    case controlActions.PLAY_SONG:
      // TODO: kick off async fetch
      return { state, state: 'loading' };
  }
  return state;
}

export default control;
