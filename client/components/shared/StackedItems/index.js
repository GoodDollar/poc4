import React from 'react'
import StackedItem from './StackedItem'
import './StackedItems.css';




const StackedItems = (props) => {

  const itemsList = props.items!=undefined?props.items:[]

  const items = itemsList.map((item, index) => {

    return <StackedItem item={item} key={index}
     
    />
  })
  
  return (
  
    <div>
        {items}
    </div>

  )
}

export default StackedItems