// sound "pseudo-component"/"psuedo-container"
// like a container, reacts to changes in the state.
// however, it is not actually a react component.
//
// call with function: connectToStore(store)

import * as sound from './lib/sound';
import { stopSong } from './actions/player';

let status;
let path;

function syncStatus() {
  console.log("syncing status to ", status);
  switch (status) {
    case 'playing': return sound.play();
    case 'loaded': return sound.stop();
    case 'paused': return sound.pause();
  }
}

function updateFromState(overallState) {
  const state = overallState.player;
  if (state.path != path) {
    path = state.path;
    status = state.status;
    sound.load(path).then(() => {
      // sync status after loading in case status changed while loading.
      syncStatus();
      // TODO: failure case. should be extremely rare
    });
  } else if (state.status != status) {
    // else if -- don't sync status yet if path changed
    status = state.status;
    syncStatus();
  }
}

export function connectToStore(store) {
  // like connect's "state to props"
  store.subscribe(() => updateFromState(store.getState()));

  // like connect's "dispatch to props"
  sound.setOnEnd(() => store.dispatch(stopSong()));
}
