import React, {useState, useRef} from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Input = styled('input')(({ theme }) => ({
  width: "auto",
  padding: 5,
  margin: 5,
  backgroundColor: theme.palette.background.paper,
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: 200,
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

type Props = {
    options
    value
    width
}
export default function UseAutocomplete(props: Props) {

    const ref1 = useRef(null)

  const [inputValue, setInputValue] = useState(props.value);
  const [exp, setExp] = useState("");
  const [filterdGroupOptions, setFilterdGroupOptions] = useState([]);
  const [testState, setTestState] = useState(true);

  const isOptionEqualToValue = (va1, va2) =>{
    return true
  }

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
    options: props.options,
    getOptionLabel: (option: string) => option,
    isOptionEqualToValue:isOptionEqualToValue
  });

  const groupedOptions2 = groupedOptions

  const onCLickLi = (option)=>{
    console.log("onCLickLi")
    setInputValue(option)
    setTestState(false)
  }

  const onClickDelete = ()=>{
    setInputValue("")
    ref1.current.focus()
    ref1.current.blur()
    setTestState(false)
  }

  const onChange = (e) =>{
    setTestState(true)
    setInputValue(e.target.value)
    setExp(".*" + e.target.value + ".*")
  }

  const onClickInput = (e) =>{
    setTestState(true)
    console.log("onClickInput")
    setInputValue(e.target.value)
    setExp("")
  }

  const fileter = (options) =>{
    const expObj = new RegExp(exp);
    const newOptions = options.filter((value)=> { return value.match(expObj) })
    return newOptions
  }

  const RenderList = () =>{

      let fileterd = []
      if(testState){
        fileterd = fileter(groupedOptions2)
      }

      console.log(testState)
      console.log(fileterd)
      if (fileterd.length > 0 ){
        return  (
            <div id="inputmemo" >
          <Listbox  {...getListboxProps()}>
            {(fileterd as typeof props.options).map((option, index) => (
              <li {...getOptionProps({ option, index })} onClick={(e)=>{onCLickLi(option)}} >&nbsp;{option}</li>
            ))}
          </Listbox>
          </div>
            )
      }else{
          return (
          <div></div>
          )
      }
    }

  return (
    <div onKeyDownCapture={(e) => {
          e.stopPropagation();
      }}>
      <div {...getRootProps()}>
        <Input {...getInputProps()} style={{ width: props.width, "border": "1px solid"}} onClick={(e) =>{onClickInput(e)}} value={inputValue} onChange={(e)=>{onChange(e)}}/>
        <button ref={ref1}style={{  "cursor": "pointer", "marginLeft": 0, "padding": 5}} className="delete" onClick={onClickDelete}> x </button>
      </div>
      <div >
      <RenderList  />
      </div>
    </div>
  );
}