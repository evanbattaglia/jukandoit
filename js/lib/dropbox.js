const config = require('../../config.js');
import Dropbox from 'dropbox';
import {isMusicFile} from './path';
const dropbox = new Dropbox({ accessToken: config.accessToken });

export function downloadSong(path) {
  return dropbox.filesDownload({path});
}

export function *listFiles(directory) {
  const path = directory == '/' ? '' : directory;
  const resp = yield dropbox.filesListFolder({path})
  return resp.entries.map((entry) => ({
    name: entry.name,
    type: entry['.tag'] === 'folder' ? 'folder' : isMusicFile(entry.name) ? 'music' : 'file',
    local: true,
  }));
}

