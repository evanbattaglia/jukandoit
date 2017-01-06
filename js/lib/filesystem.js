import * as dropbox from './dropbox';
import RNFS from 'react-native-fs';
import {base64ArrayBuffer} from './base64';
import {dirname, absolutePathJoin, isMusicFile} from './path';
const config = require('../../config.js');

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
function *downloadToLocal(path) {
  const dest = fullLocalPathFor(path);
  const destDirectory = dirname(dest);
  const response = yield RNFS.downloadFile({
    fromUrl: dropbox.downloadUrl,
    headers: dropbox.downloadHeaders(path),
    toFile: dest,
  }).promise;
  if (response.statusCode == 200) {
    console.log('FILES Downloaded!')
  } else {
    console.log('SERVER ERROR');
    console.log(response);
    RNFS.unlink(dest); // throw away promise, don't care if didn't work.
    throw new Error("Server error: status code = " + response.statusCode);
  }
}

export function *ensureLocalExists(path) {
  if (!(yield existsLocally(path))) yield downloadToLocal(path);
}

