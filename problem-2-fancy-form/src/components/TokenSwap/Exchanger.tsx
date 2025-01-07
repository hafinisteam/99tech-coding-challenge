import clsx from 'clsx'
import numbro from 'numbro'

import Spinner from '@/components/Base/Spinner'
import Typography from '@/components/Base/Typography'
import useTokenMap from '@/hooks/useTokenMap'
import { ExchangeSide } from '@/type/store'

import TokenPicker from './TokenPicker'
import { useMemo } from 'react'
import { isNumber } from '@/lib/formatter'

type ExchangerProps = {
  side: ExchangeSide
  quantity: number | string
  currentToken: string
  onPickToken: (side: ExchangeSide) => void
  loading?: boolean
  disabledInput?: boolean
  onChangeQuantity?: (value: string) => void
}

const LoadingOverlay = () => {
  return (
    <div
      className={clsx(
        'absolute inset-0 bg-white bg-opacity-70',
        'flex justify-center items-center flex-col'
      )}
    >
      <Spinner className="w-5 h-5" />
      <Typography variant="Sub" className="text-primary">
        Loading price data ...
      </Typography>
    </div>
  )
}

const Exchanger = ({
  side,
  currentToken,
  disabledInput,
  quantity,
  loading,
  onPickToken,
  onChangeQuantity,
}: ExchangerProps) => {
  const { tokenMap } = useTokenMap()

  const token = tokenMap.get(currentToken)

  const dollarRate = useMemo(() => {
    if (token && isNumber(quantity)) {
      return numbro(quantity * token.price).formatCurrency({
        thousandSeparated: true,
        mantissa: 4,
      })
    }
    return ''
  }, [quantity, token])

  return (
    <div
      className={clsx(
        'p-3 border-dimed border rounded-lg w-full relative',
        'space-y-2 transition has-[input:focus]:border-primary',
        'has-[input:invalid]:border-error'
      )}
    >
      <div>
        <Typography className="text-content-primary capitalize">
          {side}
        </Typography>
      </div>
      <div className="flex justify-between">
        <Typography className="text-content-secondary">Balance</Typography>
        {loading ? (
          <div className="w-40 h-4 animate-pulse bg-slate-200 rounded" />
        ) : (
          <Typography className="text-content-secondary">
            ≈ {dollarRate}
          </Typography>
        )}
      </div>
      <div className="flex space-x-8 items-center justify-between">
        <TokenPicker
          onClick={() => onPickToken(side)}
          side={side}
          currentToken={currentToken}
        />
        {loading ? (
          <div className="w-40 h-8 animate-pulse bg-slate-200 rounded" />
        ) : (
          <input
            type="text"
            disabled={disabledInput}
            className={clsx(
              'h-8 text-xl outline-none flex-1 text-end',
              'disabled:bg-transparent'
            )}
            value={quantity}
            onChange={(ev) => onChangeQuantity?.(ev.target.value)}
            required
          />
        )}
      </div>

      {loading ? <LoadingOverlay /> : null}
    </div>
  )
}

export default Exchanger
