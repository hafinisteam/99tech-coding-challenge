import TokenSwapContext from '../../context/TokenSwapContext'
import Typography from '../Base/Typography'
import numbro from 'numbro'

type RateOneOneProps = {
  loading: boolean
  rateData?: number
}

const RateOneOne = ({ loading, rateData }: RateOneOneProps) => {
  const { state: appState } = TokenSwapContext.useContainer()

  return (
    <div className="flex w-full justify-between items-center">
      <Typography className="text-content-secondary">Rate</Typography>
      {loading ? (
        <div className="w-40 h-3 bg-slate-200 rounded animate-pulse"></div>
      ) : (
        <Typography className="text-content-primary font-semibold">
          1 {appState.from.currency} = {numbro(rateData).format({ mantissa: 6 })} {appState.to.currency}
        </Typography>
      )}
    </div>
  )
}

export default RateOneOne
