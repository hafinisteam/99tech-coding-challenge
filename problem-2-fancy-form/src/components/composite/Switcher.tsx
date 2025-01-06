import IconSwap from '../../assets/icon-swap-vertical.svg'

const Switcher = () => {
  return (
    <button className="px-4 py-3 transition hover:opacity-70">
      <img src={IconSwap} className="w-6 h-6" />
    </button>
  )
}

export default Switcher
