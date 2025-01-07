import clsx from 'clsx'
import Typography from './Typography'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link'
  size?: 'lg' | 'md'
  onClick: () => void
  title: string
  classNames?: string
  disabled?: boolean
}

const Button = ({
  title,
  classNames,
  variant = 'primary',
  size = 'md',
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-center block',
        'w-full rounded-md transition',
        variant === 'primary' &&
          'bg-primary enabled:hover:bg-primary-dark text-white disabled:bg-opacity-70',
        variant === 'secondary' && 'bg-slate-800 hover:bg-slate-700 text-white',
        variant === 'link' && 'text-content-primary hover:bg-slate-100',
        size === 'lg' && 'py-3',
        size === 'md' && 'py-1.5',
        classNames
      )}
      disabled={disabled}
    >
      <Typography>{title}</Typography>
    </button>
  )
}

export default Button
