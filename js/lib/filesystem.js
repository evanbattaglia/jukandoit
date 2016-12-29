import * as dropbox from './dropbox';
import RNFS from 'react-native-fs';
import {base64ArrayBuffer} from './base64';
import {dirname, absolutePathJoin, isMusicFile} from './path';

export const fullLocalPathFor = path => absolutePathJoin(RNFS.DocumentDirectoryPath, 'music', path);
export const existsLocally = localPath => RNFS.exists(fullLocalPathFor(localPath))

export function *listFiles(directory) {
  let rnfsFiles;
  try {
    rnfsFiles = yield RNFS.readDir(fullLocalPathFor(directory));
  } catch (e) {
    // directory doesn't exist locally.
    // TODO: probably want to do a similar catch for dropbox, in case we've deleted data from dropbox.
    return [];
  }

  return rnfsFiles.map(file => ({
    name: file.name,
    type: file.isDirectory() ? 'folder' : isMusicFile(file.name) ? 'music' : 'file',
    local: true,
  }));
}

// TODO: maybe move elsewhere
function downloadToLocal(path) {
  const dest = fullLocalPathFor(path);
  const destDirectory = dirname(dest);
  return RNFS.mkdir(destDirectory)
    .then(() => dropbox.downloadSong(path))
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

