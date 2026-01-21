import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../store/slices/modalsSlice';
import { renameChannel } from '../../store/slices/channelsSlice';
import { updateChannel } from '../../services/api';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isOpen, extra } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);

  const channelNames = channels
    .filter((ch) => ch.id !== extra?.id)
    .map((ch) => ch.name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: extra?.name || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateChannel(extra.id, { name: values.name });
        console.log('Channel renamed via API:', { id: extra.id, name: values.name });
        dispatch(renameChannel({ id: extra.id, name: values.name }));
        dispatch(closeModal());
      } catch (error) {
        console.error('Failed to rename channel:', error);
        formik.setErrors({ name: 'Ошибка переименования канала' });
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.select();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="me-2"
              disabled={formik.isSubmitting}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
