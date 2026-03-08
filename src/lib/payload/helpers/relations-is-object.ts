export function relationIsObject<T>(relation: string | number | T): relation is T {
  return typeof relation === 'object' && relation !== null
}
