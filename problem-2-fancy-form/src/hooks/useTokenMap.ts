import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getTokenList } from '../services/token'
import { QueryKey } from '../type/query'
import { TokenItemTyped } from '../type/token'

const useTokenMap = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.TokenList],
    queryFn: () => getTokenList(),
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
    tokenMap,
  }
}

export default useTokenMap
