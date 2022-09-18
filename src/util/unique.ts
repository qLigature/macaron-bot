export function unique<Type>(array: Type[]) {
  return [...new Set(array)];
}
