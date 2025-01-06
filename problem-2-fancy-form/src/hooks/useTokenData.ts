import { useQuery } from '@tanstack/react-query'
import { getTokenList } from '../services/token'
import { QueryKey } from '../type/query'
import { useMemo } from 'react'
import { TokenItemTyped } from '../type/token'

const useTokenData = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.TokenList],
    queryFn: getTokenList,
    enabled: false,
  })

  const tokenMap = useMemo(() => {
    const map = new Map<string, TokenItemTyped>()
    if (data) {
      data.forEach((item) => {
        map.set(item.currency, item)
      })
    }
    return map
  }, [data])

  return {
    tokenListData: data,
    tokenMap,
  }
}

export default useTokenData
