export const SHELF_TYPES = ['currentlyReading', 'wantToRead', 'read', 'none']

export const [CURRENTLY_READING, WANT_TO_READ, READ, NONE] = SHELF_TYPES

export const SHELF_OPTIONS = [
  {
    code: CURRENTLY_READING,
    name: 'Currently Reading',
  },
  {
    code: WANT_TO_READ,
    name: 'Want to read',
  },
  {
    code: READ,
    name: 'Read',
  },
  {
    code: NONE,
    name: 'None',
  },
]
