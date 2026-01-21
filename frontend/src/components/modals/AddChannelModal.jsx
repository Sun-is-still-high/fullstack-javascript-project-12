import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../store/slices/modalsSlice';
import { setCurrentChannel, addChannel } from '../../store/slices/channelsSlice';
import { createChannel } from '../../services/api';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isOpen } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);

  const channelNames = channels.map((ch) => ch.name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, t('validation.usernameLength'))
      .max(20, t('validation.usernameLength'))
      .notOneOf(channelNames, t('validation.unique'))
      .required(t('validation.required')),
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
        toast.success(t('notifications.channelCreated'));
        dispatch(closeModal());
      } catch (error) {
        console.error('Failed to create channel:', error);
        toast.error(t('notifications.networkError'));
        formik.setErrors({ name: t('modals.add.error') });
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
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              name="name"
              type="text"
              placeholder={t('modals.add.placeholder')}
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
              {t('modals.add.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.add.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
