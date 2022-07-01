import React, {useState} from 'react';
import { createSelectData, createTableData } from "../../libs/create_test_data"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import UseAutocomplete from "./custom"

const Sample = ()=>{

  const [selectData, setDelectData] = useState(createSelectData(500));
  const [tableData, setTableData] = useState(createTableData(selectData, 50));


  const onClick = ()=>{
    const data = createSelectData(500)
    setDelectData(data)
    setTableData(createTableData(data, 50))
  }

  const onClickReset = ()=>{
    setDelectData([])
    setTableData([])
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'action', 
      width: 300,
      headerName: 'SelectBox-original', 
      renderCell: (params) => {
        return (<div>
          <UseAutocomplete value={params.row.name} options={selectData}></UseAutocomplete>
        </div>)
      }
    },
    { field: 'action2', 
    width: 300,
    headerName: 'SelectBox2', 
    renderCell: (params) => {
      return (<div>
 <UseAutocomplete value={params.row.name} options={selectData}></UseAutocomplete>

      </div>)
    }
    },
    { field: 'action3', 
    width: 300,
    headerName: 'SelectBox3', 
    renderCell: (params) => {
      return (<div>
 <UseAutocomplete value={params.row.name} options={selectData}></UseAutocomplete>

      </div>)
    }
    },
    { field: 'action4', 
    width: 300,
    headerName: 'SelectBox4', 
    renderCell: (params) => {
      return (<div>
 <UseAutocomplete value={params.row.name} options={selectData}></UseAutocomplete>

      </div>)
    }
    },
    { field: 'action5', 
    width: 300,
    headerName: 'SelectBox5', 
    renderCell: (params) => {
      return (<div>
 <UseAutocomplete value={params.row.name} options={selectData}></UseAutocomplete>

      </div>)
    }
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