import {downloadSong, listFiles} from './dropbox';
import RNFS from 'react-native-fs';
import {base64ArrayBuffer} from './base64';
import {dirname, absolutePathJoin} from './path';
import co from 'co';

export const fullLocalPathFor = path => absolutePathJoin(RNFS.DocumentDirectoryPath, 'music', path);
export const existsLocally = localPath => RNFS.exists(fullLocalPathFor(localPath))

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

// TODO TODO: dedup with dropbox stuff -- esp music regex, dummy '..' directory, and ogg check.
// make local return same thing as dropbox, then move eeverything else up
const parentFolder = { name: '..', type: 'folder' };

export function *localListFiles(directory) {
  let rnfsFiles;
  try {
    rnfsFiles = yield RNFS.readDir(fullLocalPathFor(directory));
  } catch (e) {
    // directory doesn't exist locally.
    // TODO: probably want to do a similar catch for dropbox, in case we've deleted data from dropbox.
    return [parentFolder];
  }

  const files = rnfsFiles.map(file => ({
    name: file.name,
    type: file.isDirectory() ? 'folder' : file.name.match(/\.(mp3|ogg)$/i) ? 'music' : 'file',
  }));
  for (const f of files) if (f.type === 'music') f.local = true;
  files.unshift({ name: '..', type: 'folder' });
  return files;
};

//// TODO move this out
// TODO using co here enables us to yield the hash with promises. but we then depend on co,
// instead of using redux-saga's generator stuff.
// could probably do a different way.
//
// Run a dropbox list files operation, but add {local: true} / {local: false}
export const dropboxListFilesWithExistence = co.wrap(function* (directory) {
  const files = yield listFiles(directory);
  for (const file of files) {
    if (file.type === 'music') {
      file.local = existsLocally(absolutePathJoin(directory, file.name));
    }
  }

  return yield files; // resolve promises
});

const MODES = {
  dropbox: dropboxListFilesWithExistence,
  local: localListFiles,
};

export function *listFilesViaMode(directory, mode) {
  return yield (MODES[mode](directory));
}
