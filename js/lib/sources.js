/**
 * Sources of files, unites "dropbox" and "filesystem"
 */

import {PARENT_DIRECTORY_SENTINEL, absolutePathJoin} from './path';
import * as dropbox from './dropbox';
import * as filesystem from './filesystem';
import co from 'co';

const PARENT_DIRECTORY_MOCK_FILE = {
  name: PARENT_DIRECTORY_SENTINEL,
  type: 'folder',
};

// TODO using co here enables us to yield the hash with promises. but we then depend on co,
// instead of using generator stuff built-in to redux-saga.
// could probably do a different way.
//
// Run a dropbox list files operation, but add {local: true} / {local: false}
const dropboxListFilesWithExistence = co.wrap(function* (directory) {
  const files = yield dropbox.listFiles(directory);
  for (const file of files) {
    if (file.type === 'music') {
      file.local = filesystem.existsLocally(absolutePathJoin(directory, file.name));
    }
  }

  return yield files; // resolve promises
});

const MODES = {
  dropbox: dropboxListFilesWithExistence,
  local: filesystem.listFiles,
};

export function *listFilesViaMode(directory, mode) {
  const files = yield (MODES[mode](directory));
  if (directory && directory !== '/') {
    files.unshift(PARENT_DIRECTORY_MOCK_FILE);
  }
  return files;
}


