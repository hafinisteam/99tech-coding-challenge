import clsx from 'clsx'
import IconLoading from '@/assets/react.svg'

const Spinner = ({ className }: { className?: string }) => {
  return (
    <img
      src={IconLoading}
      className={clsx('animate-spin-slow inline-block', className)}
    />
  )
}

export default Spinner
