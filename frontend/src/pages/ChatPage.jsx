import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { setChannels, setCurrentChannel, addChannel, removeChannel, renameChannel } from '../store/slices/channelsSlice';
import { setMessages, addMessage } from '../store/slices/messagesSlice';
import { fetchInitialData, setAuthToken } from '../services/api';
import { initSocket, disconnectSocket } from '../services/socket';
import Header from '../components/Header';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import MessageForm from '../components/MessageForm';
import ModalManager from '../components/ModalManager';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { channels = [], currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  useEffect(() => {
    const loadData = async () => {
      try {
        setAuthToken(auth.user.token);
        const data = await fetchInitialData();

        const channels = data.channels || [];
        const messages = data.messages || [];

        dispatch(setChannels(channels));
        dispatch(setMessages(messages));

        if (channels.length > 0) {
          dispatch(setCurrentChannel(data.currentChannelId || channels[0].id));
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to load data:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(t('chat.loadError'));
        toast.error(t('notifications.dataLoadError'));
        setLoading(false);

        if (err.response?.status === 401) {
          auth.logOut();
          navigate('/login');
        }
      }
    };

    loadData();
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (loading) return;

    const socket = initSocket();

    socket.on('newMessage', (message) => {
      console.log('WebSocket: newMessage received:', message);
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      console.log('WebSocket: newChannel received:', channel);
      dispatch(addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      console.log('WebSocket: removeChannel received:', id);
      dispatch(removeChannel(id));
    });

    socket.on('renameChannel', ({ id, name }) => {
      console.log('WebSocket: renameChannel received:', { id, name });
      dispatch(renameChannel({ id, name }));
    });

    return () => {
      disconnectSocket();
    };
  }, [loading, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('chat.loading')}</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-center">
          <h3>{error}</h3>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {t('chat.retry')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {currentChannel?.name || t('chat.selectChannel')}</b>
                </p>
                <span className="text-muted">
                  {currentChannel ? t('chat.channelDescription') : ''}
                </span>
              </div>
              <Messages />
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalManager />
    </div>
  );
};

export default ChatPage;
