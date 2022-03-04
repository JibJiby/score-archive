import React from 'react'
import BasketIcon from '@assets/basket_icon.svg'

interface Props {
  onClick: () => void
}

const Basket: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        // width: '100%',
        right: '1rem',
        bottom: '100px',
        // height: '20px',
        fontSize: '2rem',
        zIndex: '1',
        // display: visible ? 'inline' : 'none',
        backgroundColor: 'tomato',
        cursor: 'pointer',
        padding: '0 15px',
        // borderRadius: '50%',

        //크기 조절
      }}
      onClick={onClick}
    >
      <BasketIcon fill="white" width="30" height="30" />
    </div>
  )
}

export default Basket
