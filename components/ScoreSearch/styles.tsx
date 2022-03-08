import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const SearchInput = styled.input`
  margin: 50px auto;
  height: 3rem;
  /* 너비 */
  min-width: 250px;
  width: 50%;
  max-width: 768px;
  /*  */
  outline: none;
  border: 0;
  font-size: 16px;
  padding: 10px;
  border-radius: 6px;

  box-shadow: 0 1px 0 rgb(68 121 178 / 8%), 0 2px 10px rgb(68 121 178 / 8%);
  text-align: center;

  &:focus {
    transform: scale(1.05);
  }
`

export const SearchButton = styled.button`
  width: 200px;
  height: 2.5rem;
  margin: 15px auto;
  border: 0;
  border-radius: 6px;
  font-size: 20px;
  background-color: #001c34;
  color: white;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    opacity: 0.75;
  }
`

export const HeaderText = styled.div`
  margin: 25px auto;
  font-size: 30px;
  font-weight: 700;
  user-select: none;
  transition: all 0.5s;
`

export const Container = styled.div`
  width: 100%;
  background-color: #f1f3f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
