export let encode;
export let encodeBuffer;
if (Buffer.isEncoding('base64url')) {
  encode = (input, encoding = 'utf8') => Buffer.from(input, encoding).toString('base64url');
  encodeBuffer = (buf) => buf.toString('base64url');
} else {
  const fromBase64 = (base64) => base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  encode = (input, encoding = 'utf8') => fromBase64(Buffer.from(input, encoding).toString('base64'));
  encodeBuffer = (buf) => fromBase64(buf.toString('base64'));
}

export const decode = (input) => Buffer.from(input, 'base64').toString('utf8');
export const decodeToBuffer = (input) => Buffer.from(input, 'base64');

