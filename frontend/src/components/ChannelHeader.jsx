import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useGetChannelsQuery } from '../store/api/channelsApi'

const ChannelHeader = () => {
  const { t } = useTranslation()
  const { data: channels = [] } = useGetChannelsQuery()
  const { currentChannelId } = useSelector(state => state.currentChannel)
  const currentChannel = channels.find(ch => ch.id === currentChannelId)

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {currentChannel?.name || t('chat.selectChannel')}
        </b>
      </p>
      <span className="text-muted">
        {currentChannel ? t('chat.channelDescription') : ''}
      </span>
    </div>
  )
}

export default ChannelHeader
