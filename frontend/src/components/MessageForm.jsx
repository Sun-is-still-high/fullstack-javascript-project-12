import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useFormik } from 'formik';
import { sendMessage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MessageForm = () => {
  const auth = useAuth();
  const { currentChannelId } = useSelector((state) => state.channels);
  const [sending, setSending] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim() || !currentChannelId) return;

      setSending(true);
      setShowError(false);

      try {
        const message = {
          body: values.body,
          channelId: currentChannelId,
          username: auth.user.username,
        };

        await sendMessage(message);
        resetForm();
        inputRef.current?.focus();
      } catch (error) {
        console.error('Failed to send message:', error);

        if (error.response) {
          setErrorMessage(`Ошибка отправки: ${error.response.status}`);
        } else if (error.request) {
          setErrorMessage('Сеть недоступна. Проверьте подключение к интернету.');
        } else {
          setErrorMessage('Не удалось отправить сообщение');
        }

        setShowError(true);
      } finally {
        setSending(false);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            ref={inputRef}
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            onChange={formik.handleChange}
            disabled={sending || !currentChannelId}
            autoFocus
          />
          <Button
            type="submit"
            variant="group-vertical"
            disabled={sending || !currentChannelId || !formik.values.body.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showError}
          onClose={() => setShowError(false)}
          delay={5000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Ошибка</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MessageForm;
