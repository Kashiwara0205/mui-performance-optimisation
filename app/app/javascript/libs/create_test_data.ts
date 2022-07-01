export const createSelectData = (n) =>{
  let array = []
  for (let i = 0; i < n; i++) {
    array.push(String(Math.random()));
  }

  return array
}

export const createTableData = (selectData, n) =>{
  let array = []

  const length = selectData.length
  for (let i = 0; i < n; i++) {

    array.push({ "id": i, "name":String(selectData[  Math.floor(Math.random() * length) - 1])});
  }

  return array
}