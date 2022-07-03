import React, {useState} from 'react';
import { createSelectObjData, createTableObjData } from "../../libs/create_test_data"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import UseAutocomplete from "./custom"

const Sample = ()=>{

  const [selectData, setDelectData] = useState(createSelectObjData(500));
  console.log(selectData)
  const [tableData, setTableData] = useState(createTableObjData(selectData, 2));
  console.log(tableData)

  const onClick = ()=>{
    const data = createSelectObjData(2)
    setDelectData(data)
    setTableData(createTableObjData(data, 2))
  }

  const onClickReset = ()=>{
    setDelectData([])
    setTableData([])
  }

  const renderUseAutocomplete = (params) =>{
    return (<div>
      <UseAutocomplete width={200} value={params.row.name} options={selectData}></UseAutocomplete>
    </div>)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'action', 
      width: 300,
      headerName: 'SelectBox-original', 
      renderCell: renderUseAutocomplete
    },
    { field: 'action2', 
    width: 300,
    headerName: 'SelectBox2', 
    renderCell: renderUseAutocomplete
    },
    { field: 'action3', 
    width: 300,
    headerName: 'SelectBox3', 
    renderCell: renderUseAutocomplete
    },
    { field: 'action4', 
    width: 300,
    headerName: 'SelectBox4', 
    renderCell: renderUseAutocomplete
    },
    { field: 'action5', 
    width: 300,
    headerName: 'SelectBox5', 
    renderCell: renderUseAutocomplete
    },
  ];

  const rows = tableData

  return (
    <div>

      <Button variant="text" onClick={onClick}>Load</Button>
      <Button variant="text" onClick={onClickReset}>Reset</Button>
   <Box sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableVirtualization
        disableSelectionOnClick
      />
    </Box>
    </div>
  )
}

export default Sample