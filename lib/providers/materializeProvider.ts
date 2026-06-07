/** Class static methods are not copied by object spread — materialize as a plain object. */
export function materializeProvider<T extends object>(Provider: T): T {
  const source = Provider as Record<string, unknown>
  return Object.fromEntries(
    Object.getOwnPropertyNames(Provider)
      .filter((name) => typeof source[name] === 'function')
      .map((name) => [name, source[name]])
  ) as T
}
