import clsx from 'clsx'
import debounce from 'lodash.debounce'
import { ChangeEvent, useMemo, useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'

import IconGlass from '../../assets/icon-glass.svg'
import { searchToken } from '../../services/token'
import { QueryKey } from '../../type/query'
import { TokenItemTyped } from '../../type/token'
import Spinner from '../base/Spinner'
import Typography from '../base/Typography'
import Modal from '../layout/Modal'
import EmptyPlaceholder from '../layout/EmptyPlaceholder'

type TokenItemProps = {
  token: TokenItemTyped
  onClick: () => void
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
        src={`public/token-icons/${token.currency}.svg`}
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

const TokenPickModal = NiceModal.create(() => {
  const modal = useModal()
  const [keyword, setKeyword] = useState<string>()

  const { data: tokenListData, isLoading } = useQuery({
    queryKey: [QueryKey.SearchToken, keyword],
    queryFn: () => searchToken(keyword),
  })

  const handleChange = debounce((ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value)
  }, 300)

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
              }}
            />
          ))}
        </div>
      )
    }

    return <EmptyPlaceholder description="Token with keyword cannot be found" />
  }, [isLoading, modal, tokenListData])

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
            'border-dimed border rounded-md',
            'px-3 py-2 flex items-center space-x-2',
            'transition has-[input:focus]:border-primary'
          )}
        >
          <img src={IconGlass} alt="icon look up" />
          <input
            className="outline-none flex-1 text-sm"
            placeholder="Token name"
            onChange={handleChange}
          />
        </div>
        {resultContent}
      </div>
    </Modal>
  )
})

export default TokenPickModal
