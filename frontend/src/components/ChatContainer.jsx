import React, { useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const {messages, selectedUser, getMessages, isMessagesLoading, subscribeToMessages, unsubscribeToMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messageEnd = useRef(null);
    useEffect(() => {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return ()=>unsubscribeToMessages();
    },[selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

    useEffect(() => {
      if(messageEnd.current && messages)
      {messageEnd.current.scrollIntoView({behavior:"smooth"})}
    
    }, [messages]);
    

    if(isMessagesLoading) {return(
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
        </div>
        )}
    
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>

        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message)=>(
            <div key={message._id} 
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start" }`}
            ref={messageEnd}>
              {/*image*/}
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt='profiel pic'/>
                </div>
              </div>
              {/*timestamp */}
              <div className='chat-header mb-1'>
                <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
              </div>
              {/*message box*/}
              <div className='chat-bubble flex flex-col'>
                {message.image && (<img src={message.image} alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"/>)}
                {message.text && <p>{message.text}</p>}
              </div>

            </div>
          ))} 

        </div>

        <MessageInput/>

    </div>
  )
}

export default ChatContainer