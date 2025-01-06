import clsx from 'clsx'
import Typography from '../base/Typography'
import TokenPicker from './TokenPicker'

type ExchangerProps = {
  side: string
  token: string
  disabledInput?: boolean
}

const Exchanger = ({ disabledInput }: ExchangerProps) => {
  return (
    <div
      className={clsx(
        'p-3 border-dimed border rounded-lg w-full',
        'space-y-2 has-[input:focus]:border-primary transition'
      )}
    >
      <div>
        <Typography className="text-content-primary">From</Typography>
      </div>
      <div className="flex justify-between">
        <Typography className="text-content-secondary">Balance</Typography>
        <Typography className="text-content-secondary">
          ≈ $98106403577315409920.00
        </Typography>
      </div>
      <div className="flex space-x-8 items-center">
        <TokenPicker />
        <input
          type="text"
          disabled={disabledInput}
          className={clsx(
            'h-8 text-xl outline-none flex-1 text-end',
            'disabled:bg-transparent'
          )}
          defaultValue={0}
        />
      </div>
    </div>
  )
}

export default Exchanger
