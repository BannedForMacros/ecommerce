/* utils/imgSrc.ts  – 1 sola vez en tu proyecto */
export const imgSrc = (slugOrUrl: string) =>
  /^https?:\/\//.test(slugOrUrl) ? slugOrUrl : `/products/${slugOrUrl}.jpg`;