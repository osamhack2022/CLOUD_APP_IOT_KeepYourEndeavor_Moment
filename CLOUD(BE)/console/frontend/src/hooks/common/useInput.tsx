import react, {useState} from 'react';

export default function useInput(name: string) {    
    const [value, setValue] = useState("");
    function changeValue(e) {
      setValue(e.target.value);
      console.log(e.target.name, e.target.value);
    }
    return {
      value,
      onChange : changeValue,
      name
    }
}