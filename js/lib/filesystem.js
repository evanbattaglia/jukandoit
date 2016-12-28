import {downloadSong, listFiles} from './dropbox';
import RNFS from 'react-native-fs';
import {base64ArrayBuffer} from './base64';
import {dirname, absolutePathJoin} from './path';
import co from 'co';

export const fullLocalPathFor = path => absolutePathJoin(RNFS.DocumentDirectoryPath, 'music', path);
export const existsLocally = localPath => RNFS.exists(fullLocalPathFor(localPath))

// consider factoring out dropbox-specific stuff out of this

function downloadToLocal(path) {
  const dest = fullLocalPathFor(path);
  const destDirectory = dirname(dest);
  console.log("mkdir destDirectory ", destDirectory);
  return RNFS.mkdir(destDirectory)
    .then(() => downloadSong(path))
    .then(resp => {
      // console.log("writing the base64");
      const str = base64ArrayBuffer(resp.fileArrayBuffer);
      // console.log(typeof resp.fileArrayBuffer);
      // console.log("wtf moment ok?", str.substr(0, 100));
      return RNFS.writeFile(dest, str, 'base64');
    });
}

export function ensureLocalExists(path) {
  return existsLocally(path).then(exists => exists || downloadToLocal(path, path));
}

export function playSongFromDropbox(path) {
  ensureLocalExists(path)
    .then(() => playLocal(path))
    .catch(function(e) { console.log("shucks howdy:", e); });
}

// Run a dropbox list files operation, but add {local: true} / {local: false}
export const dropboxListFilesWithExistence = co.wrap(function *(directory) {
  const files = yield listFiles(directory);
  for (const file of files) {
    if (file.type === 'music') {
      file.local = existsLocally(absolutePathJoin(directory, file.name));
    }
  }

  return yield files; // resolve promises
});
