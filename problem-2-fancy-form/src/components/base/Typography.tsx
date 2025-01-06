import clsx from 'clsx'
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useMemo,
} from 'react'

export type TypoVariant = 'ContentPrimary' | 'Action' | 'Sub'

interface Typography extends HTMLAttributes<HTMLOrSVGImageElement> {
  className?: string
  children?: ReactNode
  variant?: TypoVariant
  href?: string
  target?: string
  as?: ElementType
}

const Typography = forwardRef<HTMLOrSVGImageElement, Typography>(
  (
    {
      className,
      children,
      variant = 'ContentPrimary',
      as: Element = 'div',
      ...rest
    },
    ref
  ) => {
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
      <Element ref={ref} className={clsx(typoClasses, className)} {...rest}>
        {children}
      </Element>
    )
  }
)

Typography.displayName = 'Typography'

export default Typography
