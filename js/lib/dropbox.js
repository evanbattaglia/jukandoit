const config = require('../../config.js');
import Dropbox from 'dropbox';
import {PARENT_DIRECTORY_SENTINEL} from './path';
const dropbox = new Dropbox({ accessToken: config.accessToken });

const PARENT_DIRECTORY_MOCK_FILE = {
  name: PARENT_DIRECTORY_SENTINEL,
  type: 'folder',
};

export function downloadSong(path = config.testSong) {
  return dropbox.filesDownload({path});
}

function typeForDropboxEntry(entry) {
  if (entry['.tag'] == 'file' && entry['name'].match(/\.(ogg|mp3)/i) ) {
    return 'music';
  } else {
    return entry['.tag'];
  }
}

export function listFiles(directory) {
  const path = directory == '/' ? '' : directory;

  return dropbox.filesListFolder({path})
    .then(resp => {
      const files = resp.entries.map((entry) => ({
        name: entry.name,
        type: typeForDropboxEntry(entry),
      }));

      if (path) {
        files.unshift(PARENT_DIRECTORY_MOCK_FILE);
      }

      return files;
    });
}
