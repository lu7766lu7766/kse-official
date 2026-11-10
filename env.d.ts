/// <reference types="vite/client" />

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

/** vite-imagetools 的 `?responsive` 預設（nuxt.config.ts）：多寬度 WebP */
declare module "*?responsive" {
  const value: { src: string; w: number; h: number; srcset?: string };
  export default value;
}
