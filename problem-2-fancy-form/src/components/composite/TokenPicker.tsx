import useTokenData from '../../hooks/useTokenData'
import Typography from '../base/Typography'
import IconChevronDown from '../../assets/icon-chevron-down.svg'
import NiceModal from '@ebay/nice-modal-react'
import TokenPickModal from '../modal/TokenPickModal'

const TokenPicker = () => {
  const { tokenMap } = useTokenData()

  const token = tokenMap.get('USDC')

  const handleClick = () => {
    NiceModal.show(TokenPickModal)
  }

  return (
    <div>
      <button
        className="flex items-center space-x-2"
        onClick={handleClick}
        type="button"
      >
        <img
          src={'public/token-icons/USDC.svg'}
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
