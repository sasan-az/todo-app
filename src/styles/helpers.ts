export function getValidSize(size: string | number): string {
  if (typeof size === "string") {
    return size;
  }
  return size.toString() + "px";
}
