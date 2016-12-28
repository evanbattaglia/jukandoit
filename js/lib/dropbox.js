const config = require('../../config.js');
import Dropbox from 'dropbox';
const dropbox = new Dropbox({ accessToken: config.accessToken });

const DIRECTORY_SEPARATOR = '/';
const PARENT_DIRECTORY_SENTINEL = '..';
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

export function pathJoin(directory, file) {
  const dirParts = directory.split(DIRECTORY_SEPARATOR).filter(part => part);
  if (file === PARENT_DIRECTORY_SENTINEL) {
    dirParts.pop();
  } else {
    dirParts.push(file);
  }

  if (dirParts.length === 0) {
    return ''; // Dropbox likes root directory called '' not '/'
  } else {
    return DIRECTORY_SEPARATOR + dirParts.join(DIRECTORY_SEPARATOR);
  }
}
