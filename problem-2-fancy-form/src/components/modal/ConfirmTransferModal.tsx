import Button from '@/components/Base/Button'
import Typography from '@/components/Base/Typography'
import Modal from '@/components/Layout/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

type ConfirmTransferModalProps = {
  onConfirm: () => void
}

const ConfirmTransferModal = NiceModal.create(
  ({ onConfirm }: ConfirmTransferModalProps) => {
    const modal = useModal()

    const handleConfirm = () => {
      modal.hide()
      onConfirm()
    }

    return (
      <Modal
        title="Confirm Swap"
        open={modal.visible}
        onClose={modal.hide}
        onLeave={modal.remove}
      >
        <div className="space-y-8">
          <Typography>
            Are you sure you want to proceed with this token swap?
          </Typography>
          <div className="grid grid-cols-2 gap-x-2">
            <Button variant="link" title="Cancel" onClick={modal.hide} />
            <Button
              variant="secondary"
              title="Confirm"
              onClick={handleConfirm}
            />
          </div>
        </div>
      </Modal>
    )
  }
)

export default ConfirmTransferModal
