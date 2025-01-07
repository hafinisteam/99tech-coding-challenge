import clsx from 'clsx'

import Button from './components/Base/Button'
import Spinner from './components/Base/Spinner'
import Exchanger from './components/TokenSwap/Exchanger'
import Switcher from './components/TokenSwap/Switcher'
import useTokenSwap from './components/TokenSwap/hooks/useTokenSwap'
import Typography from './components/Base/Typography'
import numbro from 'numbro'

function App() {
  const {
    rateData,
    isRateLoading,
    isTokenListLoading,
    appState,
    handleChangeCurrency,
    handleConfirmSwap,
    handleSwapTokenType,
    handleChangeQuantity,
  } = useTokenSwap()

  if (isTokenListLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className={clsx(
          'flex flex-col space-y-4 items-center',
          'p-6 bg-white border-dimed',
          'border rounded-lg max-sm:w-full w-[450px]'
        )}
      >
        <Exchanger
          side="from"
          currentToken={appState.from.currency}
          quantity={appState.from.quantity}
          onChangeQuantity={handleChangeQuantity}
          onPickToken={handleChangeCurrency}
        />
        <Switcher onClick={handleSwapTokenType} />
        <Exchanger
          side="to"
          currentToken={appState.to.currency}
          quantity={appState.to.quantity}
          loading={isRateLoading}
          disabledInput
          onPickToken={handleChangeCurrency}
        />
        <div className="flex w-full justify-between items-center">
          <Typography className="text-content-secondary">Rate</Typography>
          {isRateLoading ? (
            <div className="w-40 h-3 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <Typography className="text-content-primary font-semibold">
              1 {appState.from.currency} ={' '}
              {numbro(rateData).format({ mantissa: 6 })} {appState.to.currency}
            </Typography>
          )}
        </div>
        <Button
          size="lg"
          title="Confirm Swap"
          onClick={handleConfirmSwap}
          disabled={appState.from.quantity === 0}
        />
      </div>
    </div>
  )
}

export default App
