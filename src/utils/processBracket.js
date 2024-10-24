export function touchMap(map) {
  console.log(map);
  
  function getNameString(str) {
    const parts = str.split('.');
    let end = parts.length - 1;
    while (end > 0 && Number.isNaN(parseInt(parts[end])))
      end--;

    return parts.slice(end).join('.');
  }
  const res = {};

  for (let item of map) {
    item.touchedName = getNameString(item.name);
    res[item.touchedName] = item;
  }

  return res;
}