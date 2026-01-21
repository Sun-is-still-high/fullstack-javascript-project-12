import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../../store/slices/modalsSlice';
import { removeChannel } from '../../store/slices/channelsSlice';
import { deleteChannel } from '../../services/api';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, extra } = useSelector((state) => state.modals);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await deleteChannel(extra.id);
      console.log('Channel deleted via API:', extra.id);
      dispatch(removeChannel(extra.id));
      toast.success(t('notifications.channelRemoved'));
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to delete channel:', error);
      toast.error(t('notifications.networkError'));
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

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
  );
};

export default RemoveChannelModal;
