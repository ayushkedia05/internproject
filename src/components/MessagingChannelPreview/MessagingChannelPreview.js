import React, { useContext } from 'react';
import { Avatar, ChatContext } from 'stream-chat-react';
import { getCleanImage } from '../../assets';
import Badge from '@mui/material/Badge';
import './MessagingChannelPreview.css';
import { useDispatch } from 'react-redux';
import TemporaryDrawer from '../drawers/drawermodrole';
const getAvatarGroup = (members) => {
  if (members.length === 1) {
    return <Avatar image={getCleanImage(members[0])} name={members[0].user?.id} size={40} />;
  }

  if (members.length === 2) {
    return (
      <div className='channel-preview__avatars two'>
        <span>
          <Avatar
            image={getCleanImage(members[0])}
            name={members[0].user?.id}
            shape='square'
            size={40}
          />
        </span>
        <span>
          <Avatar
            image={getCleanImage(members[1])}
            name={members[1].user?.id}
            shape='square'
            size={40}
          />
        </span>
      </div>
    );
  }

  if (members.length === 3) {
    return (
      <div className='channel-preview__avatars three'>
        <span>
          <Avatar
            image={getCleanImage(members[0])}
            name={members[0].user?.id}
            shape='square'
            size={40}
          />
        </span>
        <span>
          <Avatar
            image={getCleanImage(members[1])}
            name={members[1].user?.id}
            shape='square'
            size={20}
          />
          <Avatar
            image={getCleanImage(members[2])}
            name={members[2].user?.id}
            shape='square'
            size={20}
          />
        </span>
      </div>
    );
  }

  if (members.length >= 4) {
    return (
      <div className='channel-preview__avatars'>
        <span>
          <Avatar
            image={getCleanImage(members[members.length - 1])}
            name={members[0].user?.id}
            shape='square'
            size={20}
          />
          <Avatar
            image={getCleanImage(members[members.length - 2])}
            name={members[1].user?.id}
            shape='square'
            size={20}
          />
        </span>
        <span>
          <Avatar
            image={getCleanImage(members[members.length - 3])}
            name={members[2].user?.id}
            shape='square'
            size={20}
          />
          <Avatar
            image={getCleanImage(members[members.length - 4])}
            name={members[3].user?.id}
            shape='square'
            size={20}
          />
        </span>
      </div>
    );
  }

  return null;
};

const getTimeStamp = (channel) => {
  let lastHours = channel.state.last_message_at?.getHours();
  let lastMinutes = channel.state.last_message_at?.getMinutes();
  let half = 'AM';

  if (lastHours === undefined || lastMinutes === undefined) {
    return '';
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12;
    half = 'PM';
  }

  if (lastHours === 0) lastHours = 12;
  if (lastHours === 12) half = 'PM';

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`;
  }

  return `${lastHours}:${lastMinutes} ${half}`;
};

const getChannelName = (members) => {
  const defaultName = 'Johnny Blaze';

  if (!members.length || members.length === 1) {
    return members[0]?.user.name || defaultName;
  }

  return `${members[0]?.user.name || defaultName}, ${members[1]?.user.name || defaultName}`;
};

const MessagingChannelPreview = (props) => {
  // console.log(props.latestMessage.props.source);

  let lastmessage="Nothing yet ..."
  
  const { channel, latestMessage, setActiveChannel, setIsCreating } = props;
  // console.log(latestMessage )
  //   if(latestMessage)
  //  lastmessage=props.latestMessage.props.source
  const { channel: activeChannel, client } = useContext(ChatContext);

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID,
  );

  

    let unreadcount=channel.countUnread();

  // console.log(activeChannel.id)
  return (
    <div
    className={
      channel?.id === activeChannel?.id
      ? 'channel-preview__container selected'
      : 'channel-preview__container'
    }
      onClick={async() => {
        setIsCreating(false);
        setActiveChannel(channel);


        // channel.markAllRead()
      }}
      >
  { console.log(activeChannel,"ffsd")}
      {getAvatarGroup(members)}
      <div className='channel-preview__content-wrapper'>
        <div className='channel-preview__content-top'>
          <p className='channel-preview__content-name'> 
      {members[0].user.online &&<div class="online-indicator">
    <span class="blink"></span>
  </div>}
  {console.log(unreadcount)}
  {!members[0].user.online &&<div class="online-indicator2">
    <span class="blink2"></span>
  </div>}
            {<div className='online-text'>{channel.data.name || getChannelName(members)}</div>}
          </p>
        
          <p className='channel-preview__content-time'>{getTimeStamp(channel)}
          <span><Badge className='unread' color="secondary" badgeContent={unreadcount}></Badge></span>

          </p>
        </div>
        <p className='channel-preview__content-message'>{lastmessage || 'Send a message'}</p>
      </div>
    </div>
  );
};

export default MessagingChannelPreview;