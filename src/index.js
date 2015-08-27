import isPlainObject from 'lodash/lang/isPlainObject';

export function hasIn(obj, path) {
  return typeof getIn(obj, path) !== 'undefined';
}

export function getIn(obj, path) {
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (typeof obj === 'undefined') {
      return undefined;
    }
  }
  return obj;
}

export function setIn(obj, path, value) {
  // Short circuit if setting the same thing
  if (getIn(obj, path) === value) return obj;

  let objAtPrevPath = obj;
  let objAtPrevPrevPath;

  for (let i = 0; i < path.length; i++) {
    // Next value in the obj, or the value to set if in the last path fragment.
    let nextVal = (i === path.length - 1) ? value : objAtPrevPath[path[i]];

    if (Array.isArray(objAtPrevPath)) {
      objAtPrevPath = [...objAtPrevPath];
      objAtPrevPath[path[i]] = nextVal;
    } else if (isPlainObject(objAtPrevPath)) {
      objAtPrevPath = {...objAtPrevPath};
      objAtPrevPath[path[i]] = nextVal;
    } else {
      throw new TypeError(`Unknown type to set: ${objAtPrevPath}`);
    }

    if (i === 0) {
      obj = objAtPrevPath;
    } else {
      objAtPrevPrevPath[path[i - 1]] = objAtPrevPath;
    }
    objAtPrevPrevPath = objAtPrevPath;
    objAtPrevPath = objAtPrevPath[path[i]];
  }
  return obj;
}

export function updateIn(obj, path, fn) {
  const valAtPath = getIn(obj, path);
  const newVal = fn(valAtPath);
  return setIn(obj, path, newVal);
}

export function mergeIn(obj, path, value) {
  return updateIn(obj, path, val => {
    if (Array.isArray(val)) {
      return [...val, ...value];
    } else if (isPlainObject(val)) {
      return {...val, ...value};
    } else {
      throw new TypeError(`Unknown type to merge: ${val}`);
    }
  });
}
