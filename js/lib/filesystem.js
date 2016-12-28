import {downloadSong} from './dropbox';
import RNFS from 'react-native-fs';
import {base64ArrayBuffer} from './base64';

export const fullLocalPathFor = path => RNFS.DocumentDirectoryPath + '/music/' + path;
export const existsLocally = localPath => RNFS.exists(fullLocalPathFor(localPath))

function downloadToLocal(path) {
  const dest = fullLocalPathFor(path);
  const destDirectory = dest.split('/').slice(0, -1).join('/');
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

