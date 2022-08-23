import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

function LinkList() {
  return (
    <List style={{position:"relative"}} >
      <ListItem>
        <ListItemText
          primary="Single-line item"
        />
      </ListItem>,
    </List>
  )
}

export default LinkList