export class StringUtils {
  static isEmail(text: string): boolean {
    if (!text) return false;
    var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(text);
  }

  static isPhoneNumber(phone: string): boolean {
    if (!phone) return false;
    return /^(\+?84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/.test(phone);
  }

  static isURL(str: string): boolean {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
  }

  static limitCharacters(text: string, length: number, subfix = '...'): string {
    if (text.length <= +length) return text;
    let string = text.slice(0, length);
    string += subfix;
    return string;
  }

  static removeHtmlTags(string: string): string {
    try {
      if (!string) return '';
      return string.replace(/<\/?[^>]+(>|$)/g, "");
    } catch (error) {
      return '';
    }
  }

  static toSlug(string: string): string {
    var title = string, slug;

    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    // eslint-disable-next-line
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-\-/gi, '-');
    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-/gi, '-');
    // eslint-disable-next-line
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    // eslint-disable-next-line
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
  }

  static replaceLineBreaksToHTML = (str: string) => str.replace(/(?:\r\n|\r|\n)/g, '<br>');

  static parseJSON = (str: string) => {
    try {
      return JSON.parse(str)
    } catch (error) {
      return {}
    }
  }
}