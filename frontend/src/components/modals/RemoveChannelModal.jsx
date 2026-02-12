import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Modal, Button } from 'react-bootstrap'
import { closeModal } from '../../store/slices/modalsSlice'
import { useRemoveChannelMutation } from '../../store/api/channelsApi'

const RemoveChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, extra } = useSelector(state => state.modals)
  const [removeChannel, { isLoading: isSubmitting }] = useRemoveChannelMutation()

  const handleRemove = async () => {
    try {
      await removeChannel(extra.id).unwrap()
      toast.success(t('notifications.channelRemoved'))
      dispatch(closeModal())
    }
    catch (error) {
      console.error('Failed to delete channel:', error)
      toast.error(t('notifications.networkError'))
    }
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove.body')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {t('modals.remove.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          {t('modals.remove.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
