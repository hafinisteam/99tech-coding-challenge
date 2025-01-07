import clsx from 'clsx'

import EmptyImg from '@/assets/empty_state.png'
import Typography from '@/components/Base/Typography'

type EmptyPlaceholderProps = {
  description?: string
  className?: string
}

const EmptyPlaceholder = ({
  description = 'No data',
  className,
}: EmptyPlaceholderProps) => {
  return (
    <div className={clsx('space-y-2 text-center py-2', className)}>
      <img
        src={EmptyImg}
        alt="empty"
        className="inline-block"
        height={62}
        width={100}
      />
      {description && (
        <Typography className="text-content-secondary">
          {description}
        </Typography>
      )}
    </div>
  )
}

export default EmptyPlaceholder
