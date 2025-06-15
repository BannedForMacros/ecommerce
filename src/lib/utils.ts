// src/lib/utils.ts
import clsx from 'clsx';
// si instalaste tailwind-merge

export function cn(...inputs: Parameters<typeof clsx>) {
  // sin tailwind-merge
  return clsx(inputs);
  // con tailwind-merge
}
