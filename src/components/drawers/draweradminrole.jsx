import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {DotsVertical} from 'tabler-icons-react'
import Demo from '../dd';
import Users from '../operations/channelusermoderatorupdate';
import AlertDialog from '../confirmoperations/confirmdeletedialog';
import {  useChannelStateContext, useChatContext } from 'stream-chat-react';
import { act } from 'react-dom/test-utils';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function SwipeableadminDrawer() {

  const { client } = useChatContext();
  const { channel: activeChannel} = useChatContext();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });




  // consy mute=



  const Dooperations=async(props)=>{
 console.log(props)

  if(props==='Add moderator')
  {
    return
    (
    <Demo></Demo>
    )
  }

   if(props==='Mute Channel')
   {
     const check=await activeChannel.mute();
     console.log(check)
   }

   if(props==='Delete Channel')
   {
    //  const check=await activeChannel.mute();
     console.log(activeChannel.cid)
      const cid1=activeChannel.cid;
         return(
        <AlertDialog></AlertDialog>)
       
     const response = await client.deleteChannels([cid1], {hard_delete: true});
const result = response.result // holds deletion result
   }


           


      }
   
   
   
   
   
      































  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Add moderator', 'Delete Channel', 'Leave Channel'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>Dooperations(text)}>
         
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
            // <Demo></Demo>
        ))}
      </List>
        {/* <AlertDialog> </AlertDialog> */}
    {/* <Demo></Demo> */}
      <Divider />
      <List>
        {['Remove user', 'Mute Channel', 'Add members'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>Dooperations(text)}>
       
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer('left', true)}><DotsVertical></DotsVertical></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
              {/* <Demo></Demo> */}
            {/* <AlertDialog></AlertDialog> */}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
