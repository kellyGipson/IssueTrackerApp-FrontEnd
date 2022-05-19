import React from 'react'

type propTypes = {
  buttonText: string,
  onClickFn: (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const Button = (props: propTypes) => {
  return (
    <button 
      className='w-full h-10 mt-4 text-white bg-teal-500 rounded-md' 
      onClick={props.onClickFn}
    >{props.buttonText}
    </button>
  )
}

export default Button