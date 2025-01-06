import clsx from 'clsx'
import Typography from '../base/Typography'

const ButtonTransfer = () => {
  return (
    <button
      className={clsx(
        'py-3 text-center block bg-primary text-white',
        'w-full rounded-md transition hover:bg-primary-dark'
      )}
    >
      <Typography>Confirm Transfer</Typography>
    </button>
  )
}

export default ButtonTransfer
