export function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function shouldUseSmoothScroll() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  if (isTouchDevice()) return false
  return window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export function isTabletViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches
}
