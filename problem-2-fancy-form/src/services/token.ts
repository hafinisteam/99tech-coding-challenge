import { formatNumber } from '../lib/formatter'
import tokenListData from '../mock/tokens.json'
import { TokenItemTyped } from '../type/token'

function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

export const getTokenList = async (
  keyword?: string
): Promise<TokenItemTyped[]> => {
  if (keyword) {
    return tokenListData.filter((item) =>
      item.currency.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  await sleep(1000)

  return tokenListData
}

export const getExchangeRate = async (
  from: string,
  to: string
): Promise<number> => {
  await sleep(1000)
  const fromToken = tokenListData.find((item) => item.currency === from)
  const toToken = tokenListData.find((item) => item.currency === to)
  if (fromToken && toToken) {
    return formatNumber(fromToken.price / toToken.price)
  }
  return 0
}

export const updateSwapToken = async () => {
  await sleep(1000)
  return true
}
