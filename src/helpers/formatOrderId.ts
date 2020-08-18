export function formatId(id: number): string {
  return '#' + ('00000' + id).slice(-6);
}
