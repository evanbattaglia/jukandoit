import { fullLocalPathFor } from '../lib/filesystem';
import Sound from 'react-native-sound';

let sound;
let onEnd;

// Singleton representing actual music playback
// can be thought of as a server

// Returns a promise
export function load(newPath) {
  unload();

  return new Promise((res, rej) => {
    console.log("loading ", newPath);
    // if newPath is empty, just unload.
    if (!newPath) return res();

    let s = new Sound(fullLocalPathFor(newPath), '/', (e) => {
      if (e) {
        rej(e)
      } else {
        sound = s;
        res();
      }
    });
  });
}

export function unload() {
  if (sound) {
    sound.release();
    sound = null;
  }
}

export function play() {
    console.log("playing?!");
  if (sound) {
    console.log("playing yeah!");
    sound.play(onEnd);
  }
}

export function stop() {
  if (sound) sound.stop();
}

export function pause() {
  if (sound) sound.pause();
}

export function setOnEnd(handler) {
  onEnd = handler;
}

