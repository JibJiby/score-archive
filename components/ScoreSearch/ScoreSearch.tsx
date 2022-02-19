import React from 'react'
import { logoStyle } from './styles'

const ScoreSearch = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#868e96',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          margin: '25px auto',
          fontSize: '30px',
          fontWeight: 700,
          userSelect: 'none',
          transition: 'all 0.5s',
        }}
        css={logoStyle}
      >
        악보 검색
      </div>
      <div>
        <input
          style={{
            margin: '50px auto',
            height: '3rem',
            width: '250px',
            outline: 'none',
            border: 0,
            fontSize: '16px',
            padding: '10px',
            borderRadius: '6px',
          }}
        />
      </div>
      <button
        style={{
          width: '150px',
          height: '2.5rem',
          margin: '15px auto',
          border: 0,
          borderRadius: '6px',
          fontSize: '20px',
          backgroundColor: '#96f2d7',
          userSelect: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>
    </div>
  )
}

export default ScoreSearch
