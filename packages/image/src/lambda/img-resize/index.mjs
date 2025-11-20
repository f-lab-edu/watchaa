import crypto from 'node:crypto';

import fetch from 'node-fetch';
import sharp from 'sharp';

// HMAC 서명용
const HMAC_SALT = '68075fcc527acb99d284d0bdfe7dc141e4dc80fd708179cbd96471ea6d5c2a89';

const hmacVerify = (value, sig) => {
  const expected = crypto.createHmac('sha256', HMAC_SALT).update(value).digest('hex');
  return expected === sig;
};

const decode = (b64) => Buffer.from(b64, 'base64url').toString('utf8');

export const handler = async (event) => {
  try {
    const uri = event.rawPath; // /img/w=640&q=80&f=webp&u=xxxx&sig=abcd
    const query = uri.replace('/img/', '');

    // parsing
    const parts = query.split('&');
    const params = {};
    parts.forEach((p) => {
      const [key, value] = p.split('=');
      params[key] = value;
    });

    const { w, q, f, u, sig } = params;
    const payload = `w=${w}&q=${q}&f=${f}&u=${u}`;

    // 1) signature 검증
    if (!hmacVerify(payload, sig)) {
      return { statusCode: 403, body: 'Invalid signature' };
    }

    // 2) 외부 이미지 fetch
    const url = decode(u);
    const response = await fetch(url, { timeout: 3000 });
    if (!response.ok) {
      return { statusCode: 500, body: 'Failed to fetch image' };
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // 3) Sharp 리사이즈
    const width = Number(w);
    const quality = Number(q);
    const format = f;

    let image = sharp(buffer).resize({ width, withoutEnlargement: true });

    if (format === 'webp') {
      image = image.webp({ quality });
    } else if (format === 'avif') {
      image = image.avif({ quality });
    } else {
      image = image.jpeg({ quality });
    }

    const out = await image.toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      body: out.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: 'Internal error' };
  }
};
