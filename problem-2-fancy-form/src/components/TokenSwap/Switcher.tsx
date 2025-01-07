import IconSwap from '@/assets/icon-swap-vertical.svg'

const Switcher = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className="px-4 py-3 transition hover:opacity-70"
      onClick={onClick}
    >
      <img src={IconSwap} className="w-6 h-6" />
    </button>
  )
}

export default Switcher
