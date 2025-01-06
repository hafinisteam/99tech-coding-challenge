import { mockDataList } from '../lib/mock'
import tokenListData from '../mock/tokens.json'
import { TokenItemTyped } from '../type/token'

function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

export const getTokenList = async (): Promise<TokenItemTyped[]> => {
  const { data } = await mockDataList(tokenListData)
  return data
}

export const searchToken = async (
  keyword?: string
): Promise<TokenItemTyped[]> => {
  const { data } = await mockDataList(tokenListData)
  await sleep(500)
  if (keyword) {
    return data.filter((item) =>
      item.currency.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  return data
}
