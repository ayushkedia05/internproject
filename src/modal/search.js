
import ChannelSearch from "../components/ChannelSearch";



import { ListItemButton,ListItemText ,ListItem} from '@mui/material';
    
    
// import AddmemberList from './operations/addmembers';
// import Userslist from './operations/channelusermoderatorupdate';
import UserList from '../components/operations/channelusermoderatorupdate';
// import UserListmod from './operations/channelmoderatordelete';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
p: 4,
};

export default function Search() {
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

return (
<div>
      <ListItem>
     <ListItemButton onClick={handleOpen}>
   
          <ListItemText primary='Search Channel' />
        </ListItemButton>
        </ListItem>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    {/* <Box sx={style} color={"black"}> */}
      <ChannelSearch>   </ChannelSearch>
    
  </Modal>
</div>
);
}
