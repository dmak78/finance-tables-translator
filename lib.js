export function entityNameToKey(name) {
  return name.toLowerCase().replace(/ /g,'_')
}