type ExchangeTyped = {
  currency: string
  quantity: number | string
}

export type ExchangeSide = 'from' | 'to'

export enum TokenActionKind {
  UPDATE_QUANTITY = 'update_quantity',
  CHANGE_CURRENCY = 'change_currency',
  SWAP_TOKEN = 'swap_token',
}

type TokenActionPayload = {
  side: ExchangeSide
}

type UpdateQuantityAction = {
  type: TokenActionKind.UPDATE_QUANTITY
  payload: {
    value: number | string
  } & TokenActionPayload
}

type ChangeCurrencyAction = {
  type: TokenActionKind.CHANGE_CURRENCY
  payload: {
    value: string
  } & TokenActionPayload
}

type SwapTokenAction = { type: TokenActionKind.SWAP_TOKEN }

export type TokenAction =
  | UpdateQuantityAction
  | ChangeCurrencyAction
  | SwapTokenAction

export type TokenSwapStore = Record<ExchangeSide, ExchangeTyped>
