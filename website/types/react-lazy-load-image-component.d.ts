declare module 'react-lazy-load-image-component' {
  import { ComponentType } from 'react';

  export interface LazyLoadImageProps {
    alt?: string;
    src: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    effect?: string;
    threshold?: number;
    afterLoad?: () => void;
    beforeLoad?: () => void;
    onError?: () => void;
    placeholderSrc?: string;
    [key: string]: any;
  }

  export const LazyLoadImage: ComponentType<LazyLoadImageProps>;
}

