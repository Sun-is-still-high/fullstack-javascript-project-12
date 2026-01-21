import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../store/slices/modalsSlice';
import { renameChannel } from '../../store/slices/channelsSlice';
import { updateChannel } from '../../services/api';

const RenameChannelModal = () => {
  const { t } = useTranslation();
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
      .min(3, t('validation.usernameLength'))
      .max(20, t('validation.usernameLength'))
      .notOneOf(channelNames, t('validation.unique'))
      .required(t('validation.required')),
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
        toast.success(t('notifications.channelRenamed'));
        dispatch(closeModal());
      } catch (error) {
        console.error('Failed to rename channel:', error);
        toast.error(t('notifications.networkError'));
        formik.setErrors({ name: t('modals.rename.error') });
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
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
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
              {t('modals.rename.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.rename.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
