import React from 'react'

type propTypes = {
  text: string,
}

const MenuButton = (props: propTypes) => {
  return (
    <div className="text-xs">{props.text}</div>
  )
}

export default MenuButton