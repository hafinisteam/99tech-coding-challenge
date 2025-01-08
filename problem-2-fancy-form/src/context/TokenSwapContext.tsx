import { produce } from 'immer'
import { useReducer } from 'react'
import { createContainer } from 'unstated-next'

import { TokenAction, TokenActionKind, TokenSwapStore } from '../type/store'

const initState: TokenSwapStore = {
  from: {
    currency: 'USDC',
    quantity: 0,
  },
  to: {
    currency: 'ETH',
    quantity: 0,
  },
} as const

// User immer with reducer to remove object spread on data
const reducer = produce((draft: TokenSwapStore, action: TokenAction) => {
  const { type } = action
  switch (type) {
    case TokenActionKind.UPDATE_QUANTITY: {
      const { payload } = action
      draft[action.payload.side].quantity = payload.value
      break
    }
    case TokenActionKind.CHANGE_CURRENCY: {
      const { payload } = action
      draft[action.payload.side].currency = payload.value
      break
    }
    case TokenActionKind.SWAP_TOKEN: {
      const fromBk = { ...draft.from }
      draft.from = draft.to
      draft.to = { ...fromBk, quantity: fromBk.quantity ? fromBk.quantity : 0 }
      break
    }
    default:
      return draft
  }
})

// Just a context with reducer for easy sharing data
const useTokenSwapContext = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  
  return {
    state,
    dispatch,
  }
}

const TokenSwapContext = createContainer(useTokenSwapContext)

export default TokenSwapContext
