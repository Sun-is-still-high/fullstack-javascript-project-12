import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../store/slices/modalsSlice';
import { setCurrentChannel, addChannel } from '../../store/slices/channelsSlice';
import { createChannel } from '../../services/api';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isOpen } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);

  const channelNames = channels.map((ch) => ch.name);

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
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const newChannel = await createChannel({ name: values.name });
        console.log('Channel created via API:', newChannel);
        dispatch(addChannel(newChannel));
        dispatch(setCurrentChannel(newChannel.id));
        dispatch(closeModal());
      } catch (error) {
        console.error('Failed to create channel:', error);
        formik.setErrors({ name: 'Ошибка создания канала' });
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      formik.resetForm();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              name="name"
              type="text"
              placeholder="Имя канала"
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

export default AddChannelModal;
