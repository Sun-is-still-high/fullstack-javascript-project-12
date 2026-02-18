import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useGetChannelsQuery } from '../store/api/channelsApi'
import { useGetMessagesQuery } from '../store/api/messagesApi'
import ChannelHeader from '../components/ChannelHeader'
import Channels from '../components/Channels'
import Messages from '../components/Messages'
import MessageForm from '../components/MessageForm'
import Loader from '../components/Loader'

const ChatPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  const {
    isLoading: channelsLoading,
    isError: channelsError,
    error: channelsErr,
  } = useGetChannelsQuery()

  const {
    isLoading: messagesLoading,
    isError: messagesError,
  } = useGetMessagesQuery()

  const loading = channelsLoading || messagesLoading
  const hasError = channelsError || messagesError

  useEffect(() => {
    if (channelsErr?.status === 401) {
      auth.logOut()
    }
  }, [channelsErr, auth])

  if (loading) {
    return <Loader />
  }

  if (hasError) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-center">
          <h3>{t('chat.loadError')}</h3>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {t('chat.retry')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Container fluid className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChannelHeader />
            <Messages />
            <MessageForm className="mt-auto px-5 py-3" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatPage
