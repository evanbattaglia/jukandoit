const config = require('../../config.js');
import Dropbox from 'dropbox';
import {isMusicFile} from './path';
const dropbox = new Dropbox({ accessToken: config.accessToken });

export function *listFiles(directory) {
  const path = directory == '/' ? '' : directory;
  const resp = yield dropbox.filesListFolder({path})
  return resp.entries.map((entry) => ({
    name: entry.name,
    type: entry['.tag'] === 'folder' ? 'folder' : isMusicFile(entry.name) ? 'music' : 'file',
    local: true,
  }));
}

export const downloadUrl = "https://content.dropboxapi.com/2/files/download";
export const downloadHeaders = (path) => ({
  "Authorization": "Bearer " + config.accessToken,
  "Dropbox-API-Arg": JSON.stringify({path}),
});
