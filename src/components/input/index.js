import React from 'react'
import "./style.css"
function Input({label,placeholder,state,setState,type="text"}) {
  return (
    <div className="input-wrapper">
        <p className="label-input">{label}</p>
        <input 
        placeholder={placeholder}
        value={state}
        type={type}
        onChange={(e)=>{setState(e.target.value)}}
        className="custom-input"/>
    </div>
  )
}

export default Input;