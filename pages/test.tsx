import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Test() {
  return (
    <div
      style={
        {
          // width: '100%',
          // display: 'flex',
          // alignItems: 'center',
          // flexDirection: 'column',
          // position: 'relative',
        }
      }
    >
      <ReactSearchAutocomplete items={[{ id: 0, name: 'abc' }]} />
    </div>
  )
}

export default Test
