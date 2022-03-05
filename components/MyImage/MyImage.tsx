import { RootState } from '@reducers/index'
import scoreSlice, { ScoreState } from '@reducers/score'
import { Image } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyImageWrapper } from './styles'
import CheckIcon from '@assets/check.svg'

interface Props {
  src: string
}

const MyImage: React.FC<Props> = ({ src }) => {
  const { basket } = useSelector<RootState, ScoreState>((state) => state.score)
  const dispatch = useDispatch()
  //

  const onClick = useCallback(() => {
    // console.log('------------추가')
    // console.log(basket)
    // console.log('------------추가')

    if (basket?.find((v) => v.href === src)) {
      dispatch(scoreSlice.actions.removeBasket(src))
    } else {
      dispatch(scoreSlice.actions.addBasket(src))
    }
  }, [basket])

  return (
    <MyImageWrapper>
      <Image
        src={src}
        preview={false}
        //   key={src}
        style={{
          margin: '20px auto',
        }}
        onClick={onClick}
      />
      {basket?.find((v) => v.href === src) && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            top: 40,
            right: 20,
            userSelect: 'none',

            //
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckIcon
            // 직적 svg width, height를 수정해줌 여기서 값으로 줘도 변경 안됨.
            fill="#ffa8a8"
          />
        </div>
      )}
    </MyImageWrapper>
  )
}

export default MyImage
