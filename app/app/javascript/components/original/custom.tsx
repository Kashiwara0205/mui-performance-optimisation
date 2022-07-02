import React, {useState, useRef, useEffect} from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  border: "none",
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
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

type Props = {
    options
    value
}
export default function UseAutocomplete(props: Props) {
    const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState(props.value);
  const [inputOption, setInputOption] = useState(props.options)
  const [exp, setExp] = useState(".*");
  const [state, setState] = useState(true);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    value: inputValue,
    options: inputOption,
    getOptionLabel: (option: string) => option,
    isOptionEqualToValue:(va1, va2)=> va1 === va2
  });


  const onCLickLi = (option)=>{
    setInputValue(option)
    setExp(".*" + option + ".*")
  }

  const onClickDelete = ()=>{
    setInputValue("")
    inputRef.current.focus()
    setExp("")
  }

  const onChange = (e) =>{
    console.log("x!!!!!!!!!!!!!")
    setInputValue(e.target.value)
    setExp(".*" + e.target.value + ".*")
  }

  const onClickInput = (e) =>{
    console.log("x!!!!!!!!!22222!!!!")
    setInputValue(e.target.value)
    
    //setExp(".*")
    setState(true)
  }

  const fileter = (options) =>{
      const expObj = new RegExp(exp);
      const newOptions = options.filter((value)=> { return value.match(expObj) })
      return newOptions
  }

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>useAutocomplete</Label>
        <div style={{"border": "2px solid #000000"}}>
          <Input {...getInputProps()} onClick={(e) =>{onClickInput(e)}} onChange={(e)=>{onChange(e)}}/>
          <button style={{"border": "none"}} className="delete" ref={inputRef} onClick={onClickDelete}> x </button>
        </div>
      </div>
      {fileter(groupedOptions).length > 0 ? (
        <Listbox onChange={(e)=>{console.log(e)}}  {...getListboxProps()}>
          {(fileter(groupedOptions) as typeof props.options).map((option, index) => (
            <li onClick={(e)=>{onCLickLi(option)}} >{option}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}