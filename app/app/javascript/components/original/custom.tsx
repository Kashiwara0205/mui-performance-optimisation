import React, {useState, useRef} from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Input = styled('input')(({ theme }) => ({
  width: "auto",
  padding: 5,
  margin: 5,
  border: "1px solid",
  backgroundColor: theme.palette.background.paper,
}));

const Listbox = styled('ul')(({ theme }) => ({
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 5,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

const Button = styled('button')(({ theme }) => ({
  cursor: "pointer", 
  marginLeft: 0, 
  padding: 5
}));

type Props = {
  options
  value
  width
}
export default function UseAutocomplete(props: Props) {
  const deleteButtonRef = useRef(null)

  const [inputValue, setInputValue] = useState(props.value);
  const [filterExp, setFilterExp] = useState("");
  const [avaiableListBox, setAvaiableListBox] = useState(true);

  const isOptionEqualToValue = (va1, va2) =>{ return true }

  const getOptionLabel = (option: string) =>{ return option}

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    value: inputValue,
    options: props.options,
    getOptionLabel: getOptionLabel,
    isOptionEqualToValue:isOptionEqualToValue
  });

  const onCLickLi = (option)=>{
    setInputValue(option)
    setAvaiableListBox(false)
  }

  const onClickDelete = ()=>{
    setInputValue("")
    deleteButtonRef.current.focus()
    deleteButtonRef.current.blur()
    setAvaiableListBox(false)
  }

  const onChangeInput = (e) =>{
    setAvaiableListBox(true)
    setInputValue(e.target.value)
    setFilterExp(".*" + e.target.value + ".*")
  }

  const onClickInput = (e) =>{
    setAvaiableListBox(true)
    console.log("onClickInput")
    setInputValue(e.target.value)
    setFilterExp("")
  }

  const onKeyDownCapture = (e) =>{
    e.stopPropagation();
  }

  const fileter = (options) =>{
    const expObj = new RegExp(filterExp);
    const newOptions = options.filter((value)=> { return value.match(expObj) })
    return newOptions
  }

  const RenderList = () =>{
    let fileterdGroupOptions = []
    if(avaiableListBox){
      fileterdGroupOptions = fileter(groupedOptions)
    }

    if (fileterdGroupOptions.length > 0 ){
      return  (
        <div>
          <Listbox  {...getListboxProps()} style={{"width": props.width}}>
            {(fileterdGroupOptions as typeof props.options).map((option, index) => (
              <li {...getOptionProps({ option, index })} onClick={()=>{onCLickLi(option)}} >&nbsp;{option}</li>
            ))}
          </Listbox>
        </div>
      )
    }else{
      return (
        null
      )
    }
  }
  
  return (
    <div onKeyDownCapture={onKeyDownCapture}>
      <div {...getRootProps()}>
        <Input {...getInputProps()} style={{ width: props.width}} onClick={onClickInput} value={inputValue} onChange={onChangeInput}/>
        <Button ref={deleteButtonRef} onClick={onClickDelete}> x </Button>
      </div>
      <div >
        <RenderList  />
      </div>
    </div>
  );
}