import React from 'react'

const RemoveProductNotification = ({itemTitle}) => {
  return (
    <div>
      <h1>Are you sure you want to delete {itemTitle}</h1>
    </div>
  );
}

export default RemoveProductNotification
