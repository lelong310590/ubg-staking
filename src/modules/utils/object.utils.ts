export class ObjectUtils {
  static getIn(obj: any, path: string, def?: any, convertValue?: (value: any) => void) {
    try {
      /**
  * If the path is a string, convert it to an array
  * @param  {String|Array} path The path
  * @return {Array}             The path array
  */
      var stringToPath = function (path: string) {
        // If the path isn't a string, return it
        if (typeof path !== 'string') return path;
        // Create new array
        var output: any = [];
        // Split to an array with dot notation
        path.split('.').forEach(function (item) {

          // Split to an array with bracket notation
          item.split(/\[([^}]+)\]/g).forEach(function (key) {

            // Push to the new array
            if (key.length > 0) {
              output.push(key);
            }

          });
        });
        return output;
      };

      // Get the path as an array
      path = stringToPath(path);
      // Cache the current object
      var current = obj || {};

      // For each item in the path, dig into the object
      for (var i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (typeof current[path[i]] === 'undefined') return def;
        // Otherwise, update the current  value
        current = current[path[i]];
      }

      if (current && convertValue) return convertValue(current);
      return current;
    } catch (error) {
      return def;
    }
  };

  static cleanObj(obj: any) {
    obj = obj || {};

    if (Array.isArray(obj)) {
      return obj.map(item => Object.keys(item).reduce((acc, key) => (
        item[key] === undefined
          || item[key] === null
          || item[key] === ''
          ? acc
          : { ...acc, [key]: item[key] }
      ), {}))
    }

    return Object.keys(obj).reduce((acc, key) => (
      obj[key] === undefined
        || obj[key] === null
        || obj[key] === ''
        ? acc
        : { ...acc, [key]: obj[key] }
    ), {})
  }

  static isEmptyObj(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  static isHasValue(obj: any) {
    return !ObjectUtils.isEmptyObj(obj)
  }

  static selects(obj: any, keys: string[]) {
    return keys.reduce((acc: any, key) => {
      acc[key] = obj[key];
      return acc;
    }, {})
  }

  static toQueryString(query: any, keyOfItemsMustBeEndCode?: string[]) {
    try {
      const cleanedObj: any = Object.keys(query).reduce((acc, key) => (
        query[key] === undefined
          || query[key] === null
          || query[key] === ''
          || query[key] === []
          ? acc
          : { ...acc, [key]: query[key] }
      ), {})

      let output = '?';
      for (const key in cleanedObj) {
        if (cleanedObj[key]) {
          const item = cleanedObj[key];
          if (keyOfItemsMustBeEndCode && keyOfItemsMustBeEndCode.includes(key)) {
            output += `${key}=${encodeURIComponent(item)}&`;
          } else {
            output += `${key}=${item}&`;
          }
        }
      }

      return output.slice(0, output.length - 1)
    } catch (error) {
      return ''
    }
  }
}