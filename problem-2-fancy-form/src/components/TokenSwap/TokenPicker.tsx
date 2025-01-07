import IconChevronDown from '@/assets/icon-chevron-down.svg'
import Typography from '@/components/Base/Typography'
import useTokenMap from '@/hooks/useTokenMap'
import { ExchangeSide } from '@/type/store'

type TokenPickerProps = {
  currentToken: string
  side: ExchangeSide
  onClick: () => void
}

const TokenPicker = ({ currentToken, onClick }: TokenPickerProps) => {
  const { tokenMap } = useTokenMap()

  const token = tokenMap.get(currentToken)

  return (
    <div>
      <button
        className="flex items-center space-x-2"
        onClick={onClick}
        type="button"
      >
        <img
          src={`/token-icons/${currentToken}.svg`}
          className="w-5 h-5 inline-block"
        />
        <Typography variant="Action" as="span">
          {token?.currency}
        </Typography>
        <img src={IconChevronDown} className="w-2 h-1.5" />
      </button>
    </div>
  )
}

export default TokenPicker
