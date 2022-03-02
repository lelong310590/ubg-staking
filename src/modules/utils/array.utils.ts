export class ArrayUtils {
  static replaceItemAtIndex(arr: any[], index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  static removeItemAtIndex(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  static getLastItems(arr: any[], limit: number) {
    if (arr.length <= limit) return arr;
    return [...arr].slice(arr.length - limit, arr.length);
  }

  static findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
    let l = array.length;
    while (l--) {
      if (predicate(array[l], l, array))
        return l;
    }
    return -1;
  }

  static findMaxValue(array: any[], fieldName: string) {
    return Math.max.apply(Math, array.map(function (o) {
      return o[fieldName];
    }));
  }
}