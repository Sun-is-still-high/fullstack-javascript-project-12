import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import filter from 'leo-profanity'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useSendMessageMutation } from '../store/api/messagesApi'

const MessageForm = ({ className }) => {
  const { t } = useTranslation()
  const { currentChannelId } = useSelector(state => state.currentChannel)
  const inputRef = useRef(null)
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation()

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim() || !currentChannelId) return

      try {
        const message = {
          body: filter.clean(values.body),
          channelId: currentChannelId,
        }

        await sendMessage(message).unwrap()
        resetForm()
        inputRef.current?.focus()
      }
      catch (error) {
        console.error('Failed to send message:', error)
        toast.error(t('messages.errors.networkError'))
      }
    },
  })

  return (
    <div className={className}>
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            ref={inputRef}
            name="body"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.enterMessage')}
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
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageForm
