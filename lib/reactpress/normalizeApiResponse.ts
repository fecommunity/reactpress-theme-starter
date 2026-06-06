/** Paginated ReactPress endpoints return `[items, total]` after envelope unwrap. */
export function normalizePaginated<T>(value: unknown): [T[], number] {
  if (Array.isArray(value) && value.length >= 2 && Array.isArray(value[0])) {
    const items = value[0] as T[]
    const total = typeof value[1] === 'number' ? value[1] : items.length
    return [items, total]
  }

  if (Array.isArray(value)) {
    return [value as T[], value.length]
  }

  return [[], 0]
}

/** List endpoints return a plain array after envelope unwrap. */
export function normalizeList<T>(value: unknown): T[] {
  if (!Array.isArray(value)) return []

  if (value.length === 2 && Array.isArray(value[0]) && typeof value[1] === 'number') {
    return value[0] as T[]
  }

  return value as T[]
}
