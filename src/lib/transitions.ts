// transitions.ts
import { cubicInOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

// Define options for your custom transition.
interface SlideOptions {
  /**
   * Delay (in ms) before the transition starts.
   */
  delay?: number;
  /**
   * Duration (in ms) the transition takes.
   */
  duration?: number;
  /**
   * Easing function for the transition (e.g. cubicInOut).
   */
  easing?: EasingFunction;
  /**
   * Direction of the transition: 'in' (slide in from left) or 'out' (slide out to right).
   */
  direction?: 'in' | 'out';
}

/**
 * A custom horizontal slide transition that:
 * - slides in from the left (when `direction = 'in'`),
 * - or slides out to the right (when `direction = 'out'`).
 *
 * Usage in a Svelte component:
 *
 * <div in:horizontalSlide={{ direction: 'in' }} out:horizontalSlide={{ direction: 'out' }}>
 *   ...
 * </div>
 */
export function horizontalSlide(
  node: Element,
  {
    delay = 0,
    duration = 400,
    easing = cubicInOut,
    direction = 'in'
  }: SlideOptions = {}
) {
  // Read existing transform to preserve any rotation/scale already on the element.
  const style = getComputedStyle(node);
  const existingTransform = style.transform === 'none' ? '' : style.transform;

  return {
    delay,
    duration,
    easing,
    // Svelte uses `css: (t) => string` to build the transition's inline style over time `t`.
    css: (t: number) => {
      // 'in': -100% -> 0% | 'out': 0% -> 100%
      const start = direction === 'in' ? -100 : 0;
      const end = direction === 'in' ? 0 : 100;
      const x = start + (end - start) * t;
      return `transform: ${existingTransform} translateX(${x}%);`;
    }
  };
}

