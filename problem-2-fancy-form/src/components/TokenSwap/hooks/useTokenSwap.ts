import toast from 'react-hot-toast'

import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'

import TokenSwapContext from '../../../context/TokenSwapContext'
import {
  getExchangeRate,
  getTokenList,
  updateSwapToken,
} from '../../../services/token'
import { QueryKey } from '../../../type/query'
import { ExchangeSide, TokenActionKind } from '../../../type/store'
import { TokenItemTyped } from '../../../type/token'
import ConfirmTransferModal from '../../Modal/ConfirmTransferModal'
import TokenSelectionModal from '../../Modal/TokenSelectionModal'
import { formatNumber } from '../../../lib/formatter'

function useTokenSwap() {
  const { state: appState, dispatch } = TokenSwapContext.useContainer()

  const { isLoading: isTokenListLoading } = useQuery({
    queryKey: [QueryKey.TokenList],
    queryFn: () => getTokenList(),
  })

  // Get new rate data for from / to
  // Once complete, recalculate exchange rate
  const { data: rateData, isLoading: isRateLoading } = useQuery({
    queryKey: [
      QueryKey.TokenList,
      appState.from.currency,
      appState.to.currency,
    ],
    queryFn: () =>
      getExchangeRate(appState.from.currency, appState.to.currency).then(
        (rateData) => {
          dispatch({
            type: TokenActionKind.UPDATE_QUANTITY,
            payload: {
              side: 'to',
              value: formatNumber(
                (appState.from.quantity as number) * rateData
              ),
            },
          })
          return rateData
        }
      ),
  })

  // Confirm swapping with mock function call
  // Loading indicator with BE API
  const handleConfirmSwap = () => {
    NiceModal.show(ConfirmTransferModal, {
      onConfirm: () => {
        toast.promise(updateSwapToken, {
          loading: 'Swapping your token...',
          success: 'Swapped successfully',
        })
      },
    })
  }

  // On changing from quality
  // Recalculate exchange rate for to
  const handleChangeQuantity = (value: string) => {
    const regex = /^[0-9]*$/
    const isEmpty = value === ''
    const isNumber = regex.test(value)

    if (isEmpty || isNumber) {
      const format = parseInt(value, 10)
      dispatch({
        type: TokenActionKind.UPDATE_QUANTITY,
        payload: { side: 'from', value: isEmpty ? value : format },
      })
      if (rateData) {
        dispatch({
          type: TokenActionKind.UPDATE_QUANTITY,
          payload: {
            side: 'to',
            value: isEmpty ? 0 : formatNumber(format * rateData),
          },
        })
      }
    }
  }

  // Just swapping from / to data in store
  const handleSwapTokenType = () => {
    dispatch({
      type: TokenActionKind.SWAP_TOKEN,
    })
  }

  const handleChangeCurrency = (side: ExchangeSide) => {
    NiceModal.show(TokenSelectionModal, {
      onSelectToken: (token: TokenItemTyped) => {
        dispatch({
          type: TokenActionKind.CHANGE_CURRENCY,
          payload: {
            side,
            value: token.currency,
          },
        })
      },
    })
  }

  return {
    appState,
    rateData,
    isRateLoading,
    isTokenListLoading,
    handleChangeCurrency,
    handleSwapTokenType,
    handleConfirmSwap,
    handleChangeQuantity,
  }
}

export default useTokenSwap
