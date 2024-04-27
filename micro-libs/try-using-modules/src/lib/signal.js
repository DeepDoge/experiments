/**
 * @template T
 * @typedef Signal
 * @property {T} ref
 * @property {{ (follower: Follower<T>): Unfollow }} follow
 */

/**
 * @template T
 * @typedef {{ (value: T): void }} Follower
 */

/**
 * @typedef {{ (): void }} Unfollow
 */

/**
 * @template T
 * @param {T} value
 * @returns {Signal<T>}
 */
export function signal(value) {
  /**
   * @type {Set<Function>}
   */
  const followers = new Set();
}
