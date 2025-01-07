import clsx from 'clsx'

import Button from './components/Base/Button'
import Spinner from './components/Base/Spinner'
import Exchanger from './components/TokenSwap/Exchanger'
import Switcher from './components/TokenSwap/Switcher'
import useTokenSwap from './components/TokenSwap/hooks/useTokenSwap'
import RateOneOne from './components/TokenSwap/RateOneOne'

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
          'border rounded-lg max-sm:w-full w-[450px] max-sm:mx-4'
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
        <RateOneOne loading={isRateLoading} rateData={rateData} />
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
