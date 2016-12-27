const config = require('../config.js');
const Dropbox = require('dropbox');
const dropbox = new Dropbox({ accessToken: config.accessToken });

export function downloadSong(path = config.testSong) {
  return dropbox.filesDownload({path});
}

export function listFiles(directory) {
  const path = directory == '/' ? '' : directory;

  return dropbox.filesListFolder({path})
    .then(resp => resp.entries.map((entry) => ({
        name: entry.name,
        type: entry['.tag'],
    })));
}
