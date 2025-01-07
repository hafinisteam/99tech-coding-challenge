import clsx from 'clsx'
import debounce from 'lodash.debounce'
import { ChangeEvent, useMemo, useRef, useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'

import IconClear from '../../assets/icon-clear.svg'
import IconGlass from '../../assets/icon-glass.svg'
import { getTokenList } from '../../services/token'
import { QueryKey } from '../../type/query'
import { TokenItemTyped } from '../../type/token'
import Spinner from '../Base/Spinner'
import Typography from '../Base/Typography'
import EmptyPlaceholder from '../Layout/EmptyPlaceholder'
import Modal from '../Layout/Modal'

type TokenItemProps = {
  token: TokenItemTyped
  onClick: () => void
}

type TokenSelectionModalProps = {
  onSelectToken: (token: TokenItemTyped) => void
}

const TokenItem = ({ token, onClick }: TokenItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex w-full items-center space-x-3 px-3 py-2',
        'hover:bg-dimed transition rounded-md'
      )}
    >
      <img
        src={`/token-icons/${token.currency}.svg`}
        className="w-6 h-6"
        alt={token.currency}
      />
      <div className="text-left">
        <Typography variant="Action">{token.currency}</Typography>
        <Typography variant="Sub" className="text-dark-pink">
          ${token.price}
        </Typography>
      </div>
    </button>
  )
}

const TokenSelectionModal = NiceModal.create(
  ({ onSelectToken }: TokenSelectionModalProps) => {
    const modal = useModal()
    const [keyword, setKeyword] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null)

    const { data: tokenListData, isLoading } = useQuery({
      queryKey: [QueryKey.TokenList, keyword],
      queryFn: () => getTokenList(keyword),
    })

    // Use debouce to reduce calling API times
    const handleChange = debounce((ev: ChangeEvent<HTMLInputElement>) => {
      setKeyword(ev.target.value)
    }, 300)

    const handleClear = () => {
      setKeyword(undefined)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    const resultContent = useMemo(() => {
      if (isLoading)
        return (
          <div className="p-8 text-center">
            <Spinner className="w-8 h-8" />
          </div>
        )

      if (tokenListData?.length) {
        return (
          <div className="max-h-80 overflow-auto space-y-2">
            {tokenListData?.map((item) => (
              <TokenItem
                token={item}
                key={item.currency}
                onClick={() => {
                  modal.hide()
                  onSelectToken(item)
                }}
              />
            ))}
          </div>
        )
      }

      return (
        <EmptyPlaceholder description="Token with keyword cannot be found" />
      )
    }, [isLoading, modal, onSelectToken, tokenListData])

    return (
      <Modal
        title="Select Token"
        open={modal.visible}
        onClose={modal.hide}
        onLeave={modal.remove}
        panelClassName="w-[550px]"
      >
        <div className="space-y-6">
          <div
            className={clsx(
              'flex space-x-2 border-dimed border rounded-md',
              'px-3 py-2 flex items-center',
              'transition has-[input:focus]:border-primary'
            )}
          >
            <div className="flex items-center space-x-2 flex-1">
              <img src={IconGlass} alt="icon look up" />
              <input
                className="outline-none flex-1 text-sm"
                placeholder="Token name"
                onChange={handleChange}
                ref={inputRef}
              />
            </div>
            {keyword ? (
              <button type="button" onClick={handleClear}>
                <img src={IconClear} alt="icon clear" className="w-5 h-4" />
              </button>
            ) : null}
          </div>
          {resultContent}
        </div>
      </Modal>
    )
  }
)

export default TokenSelectionModal
