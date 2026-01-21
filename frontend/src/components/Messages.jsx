import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messagesEndRef = useRef(null);
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  const currentMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentMessages.length === 0 ? (
        <div className="text-muted">Нет сообщений</div>
      ) : (
        currentMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.body}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
