import React from 'react'
import BasketIcon from '@assets/basket_icon.svg'
import { BasketIconWrapper } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@reducers/index'
import { ScoreState } from '@reducers/score'

interface Props {
  onClick: () => void
}

const Basket: React.FC<Props> = ({ onClick }) => {
  const { basket } = useSelector<RootState, ScoreState>((state) => state.score)

  return (
    <BasketIconWrapper onClick={onClick}>
      <div
        style={{
          position: 'absolute',
          top: 3,
          right: 5,
          fontSize: '16px',

          //
          display: basket && basket.length > 0 ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',

          //
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
        }}
      >
        {basket?.length}
      </div>
      <BasketIcon fill="tomato" width="30" height="30" />
    </BasketIconWrapper>
  )
}

export default Basket
