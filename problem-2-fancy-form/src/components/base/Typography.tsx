import clsx from 'clsx'
import { ElementType, HTMLAttributes, ReactNode, useMemo } from 'react'

export type TypoVariant = 'ContentPrimary' | 'Action' | 'Sub'

interface TypographyProps extends HTMLAttributes<HTMLOrSVGImageElement> {
  className?: string
  children?: ReactNode
  variant?: TypoVariant
  as?: ElementType
}

const Typography = ({
  className,
  children,
  variant = 'ContentPrimary',
  as: Element = 'div',
  ...rest
}: TypographyProps) => {
  const typoClasses = useMemo(() => {
    switch (variant) {
      case 'Action':
        return 'text-base font-medium leading-5'
      case 'ContentPrimary':
        return 'text-sm font-normal leading-5'
      case 'Sub':
        return 'text-xs font-medium leading-5'
    }
  }, [variant])

  return (
    <Element className={clsx(typoClasses, className)} {...rest}>
      {children}
    </Element>
  )
}

export default Typography
