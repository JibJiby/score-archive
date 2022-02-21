import * as Hangul from 'hangul-js'

/**
 * 문자열을 자음으로 변환하는 함수
 */
const convertConsonant = (word: string): string => {
  // 2번째 인자 true인 경우 한글자당 그룹으로 묶어줌.
  const d = Hangul.disassemble(word.replace(/\s/, ''), true)
  const result: string[] = []
  d.forEach((v) => result.push(v[0]))
  return result.join('').replace(/\s/, '')
}

export default convertConsonant
