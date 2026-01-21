import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../../store/slices/modalsSlice';
import { removeChannel } from '../../store/slices/channelsSlice';
import { deleteChannel } from '../../services/api';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { isOpen, extra } = useSelector((state) => state.modals);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await deleteChannel(extra.id);
      console.log('Channel deleted via API:', extra.id);
      dispatch(removeChannel(extra.id));
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to delete channel:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Отменить
        </Button>
        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
