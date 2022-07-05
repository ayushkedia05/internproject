// import { useState } from 'react';
// import { Modal, Button, Group } from '@mantine/core';
// // import UserListmode from './operations/channelusermoderatorupdate';
// function Demo() {
  //   const [opened, setOpened] = useState(false);
  
  
  //   return (
    //     <>
    //       <Modal
    //         opened={opened}
    //         onClose={() => setOpened(false)}
    //         title="Select Users"
    //       >
    //         <Userslist></Userslist>
    //            {/* <UserListmod></UserListmod> */}
    //       </Modal>
    
    //       <Group position="center">
    //         <Button onClick={() => setOpened(true)}>Open Modal</Button>
    //       </Group>
    //     </>
    //   );
    // }
    // export default Demo;
    
    
    
    import Userslist from './operations/channelusermoderatorupdate';
    import UserListmod from './operations/channelmoderatordelete';
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

export default function Demo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <Userslist></Userslist>
        </Box>
      </Modal>
    </div>
  );
}
