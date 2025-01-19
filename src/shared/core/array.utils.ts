export function ArrayIncludes<T extends readonly string[]>(
  array: T,
  item: any,
): item is T[number] {
  return array.includes(item as T[number]);
}
