import React from 'react'

type propTypes = {
  id: string,
  inputName: string,
  styles: string,
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClickFn: (e: React.MouseEvent<HTMLInputElement>) => void,
}

const InputField = (props: propTypes) => {
  return (
  <div className="flex flex-col w-full text-left mt-4">
    <label>{props.inputName}</label>
    <input id={props.id} className={`pl-2 rounded border ${props.styles}`} onChange={(e?) => props.onChangeFn(e)} onClick={(e?) => props.onClickFn(e)}/>
  </div>
  )
}

export default InputField