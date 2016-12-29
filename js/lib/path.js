const DIRECTORY_SEPARATOR = '/';
export const PARENT_DIRECTORY_SENTINEL = '..';

// Always returns a leading '/', even when one not given, except when
// end path is '/', then returns just '', because that's how Dropbox likes it.
export function absolutePathJoin(...paths) {
  const dirParts = [];
  for (const path of paths) {
    for (const part of path.split(DIRECTORY_SEPARATOR)) {
      if (part === PARENT_DIRECTORY_SENTINEL) {
        dirParts.pop();
      } else if (part) {
        dirParts.push(part);
      }
    }
  }

  if (dirParts.length === 0) {
    return ''; // Dropbox likes root directory called '' not '/'
  } else {
    return DIRECTORY_SEPARATOR + dirParts.join(DIRECTORY_SEPARATOR);
  }
}

export const dirname = (path) => absolutePathJoin(path, PARENT_DIRECTORY_SENTINEL);

export const isMusicFile = (name) => name.match(/\.(ogg|mp3)/i);
