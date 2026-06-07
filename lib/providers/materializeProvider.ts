/** Class static methods are not copied by object spread — materialize as a plain object. */
export function materializeProvider<T extends Record<string, unknown>>(Provider: T): T {
  return Object.fromEntries(
    Object.getOwnPropertyNames(Provider)
      .filter((name) => typeof Provider[name] === 'function')
      .map((name) => [name, Provider[name]])
  ) as T
}
