import styled from '@emotion/styled'

/**
 *         position: 'fixed',
        // width: '100%',
        right: '1rem',
        bottom: '40px', // BackTop과 겹침.
        // height: '20px',
        fontSize: '2rem',
        zIndex: '1',
        backgroundColor: 'white',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '50%',
 */

export const BasketIconWrapper = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 40px;
  font-size: 2rem;
  z-index: 1;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 30%) 0px 8px 40px, rgb(255 255 255 / 20%) 0px 0px 0px 1px inset;

  width: 70px;
  height: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
`
