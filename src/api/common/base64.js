export default class TextEncoderUtil {
  static encode(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }
}
