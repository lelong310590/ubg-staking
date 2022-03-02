export class NumberUtils {
  static isNumber(plain: any) {
    return !isNaN(plain);
  }

  static isCoordinates(plain: any) {
    return /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g.test(plain) || /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g.test(plain);
  }

  static toCurrency(num: number, suffix: string = 'đ') {
    if (typeof num !== 'number' || Number.isNaN(num)) return '--';
    let output = new Intl.NumberFormat('en-GB').format(num);
    if (suffix) output = `${output}${suffix}`;
    return output;
  }

  static roundNumber(num: number, scale: number) {
    if (!("" + num).includes("e")) {
      return +(Math.round(+(num + "e+" + scale)) + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if (+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+(+arr[0] + "e" + sig + (+arr[1] + scale))) + "e-" + scale);
    }
  }

  static cryptoConvertToStringAmount(amount: number, decimalPlus: number): string {
    const scale = +decimalPlus - (amount.toString().split('.')[1]?.length || 0);
    let output = amount.toString();
    for (let i = 0; i < scale; i++) output += '0';
    return output.replace('.', '');
  }

  static cryptoConvert(type: 'encode' | 'decode', amount: number, decimals: number) {
    if (type === 'decode') {
      return (amount) / + ("1" + new Array(+decimals).fill(0).toString().replace(/,/g, ''));
    }
    const scale = +decimals - (amount.toString().split('.')[1]?.length || 0);
    let output = amount.toString();
    for (let i = 0; i < scale; i++) output += '0';
    output = output.replace('.', '');
    if (output[0] === "0") output = output.slice(1, output.length)
    return output;
  }

  static formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = +decimals < 0 ? 0 : +decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}