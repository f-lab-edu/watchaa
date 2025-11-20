import { ComponentProps, CSSProperties } from 'react';

type Format = 'webp' | 'avif' | 'jpeg';

type BaseProps = ComponentProps<'img'> & {
  src: string;
  alt: string;
  quality?: number;
  format?: Format;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  objectFit?: CSSProperties['objectFit'];
};

type FixedProps = BaseProps & {
  width: number;
  height: number;
  fill?: false;
};

type FillProps = BaseProps & {
  fill: true;
  width?: never;
  height?: never;
};

export type ImageProps = FixedProps | FillProps;

export type SignedImageUrls = {
  '1x': string | null;
  '2x': string | null;
  '3x': string | null;
  tiny: string | null;
};
