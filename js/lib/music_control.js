import {ensureLocalExists, fullLocalPathFor} from './filesystem';
import Sound from 'react-native-sound';

// TODO: probably need to make a pseudo-component which wraps around this.
// or something. it's going to be weird

function playLocal(path) {
  const s = new Sound(fullLocalPathFor(path), '/', (e) => {
    if (e) {
      console.log('error', e);
    } else {
      console.log('duration', s.getDuration());
      s.play();
    }
  });
  // TODO: then later, need to release. otherwise they run out!
}

export function playSongFromDropbox(path) {
  ensureLocalExists(path)
    .then(() => playLocal(path))
    .catch(function(e) { console.log("shucks howdy:", e); });
}
