import { Fragment, ReactNode } from 'react'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'

import IconClose from '../../assets/icon-close.svg'
import Typography from '../base/Typography'
import clsx from 'clsx'

export interface BaseModalProps {
  open: boolean
  title: string
  panelClassName?: string
  width?: number | string
  onClose: () => void
  onLeave?: () => void
}

interface ModalProps extends BaseModalProps {
  children: ReactNode
}

const Modal = ({
  children,
  title,
  open,
  panelClassName,
  onClose,
  onLeave,
}: ModalProps) => {
  return (
    <Transition show={open} as={Fragment} afterLeave={onLeave}>
      <Dialog onClose={onClose}>
        {/* Applies transition to the backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 z-[999]" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-hidden z-[1000]">
          <div className="flex items-center h-full justify-center">
            {/* Applies transition to the content */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={clsx(
                  'min-h-32 bg-white rounded',
                  'align-middle p-6 border max-sm:w-[95%] w-[455px]',
                  panelClassName
                )}
              >
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="Action">{title}</Typography>
                  <button onClick={onClose}>
                    <img src={IconClose} alt="icon-close" className="w-6 h-6" />
                  </button>
                </div>
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
