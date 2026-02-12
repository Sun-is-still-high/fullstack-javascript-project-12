import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import { useGetChannelsQuery } from '../store/api/channelsApi'
import { setCurrentChannel } from '../store/slices/channelsSlice'
import { openModal } from '../store/slices/modalsSlice'

const Channels = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data: channels = [] } = useGetChannelsQuery()
  const { currentChannelId } = useSelector(state => state.currentChannel)

  const handleChannelClick = (channelId) => {
    dispatch(setCurrentChannel(channelId))
  }

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }))
  }

  const handleRename = (channel) => {
    dispatch(openModal({
      type: 'renameChannel',
      extra: { id: channel.id, name: channel.name },
    }))
  }

  const handleRemove = (channel) => {
    dispatch(openModal({
      type: 'removeChannel',
      extra: { id: channel.id },
    }))
  }

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          variant="group-vertical"
          size="sm"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav variant="pills" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <Nav.Item key={channel.id} className="w-100">
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                variant={currentChannelId === channel.id ? 'secondary' : ''}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleChannelClick(channel.id)}
                aria-label={channel.name}
              >
                {channel.name}
              </Button>
              {channel.removable && (
                <>
                  <Dropdown.Toggle
                    split
                    variant={currentChannelId === channel.id ? 'secondary' : ''}
                    className="flex-grow-0"
                  >
                    <span className="visually-hidden">{t('channels.manage')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRemove(channel)}>
                      {t('channels.remove')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRename(channel)}>
                      {t('channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </Nav.Item>
        ))}
      </Nav>
    </>
  )
}

export default Channels
