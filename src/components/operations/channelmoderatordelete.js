







import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext, useChannelStateContext} from 'stream-chat-react';
import './channeluser.css'
// import { InviteIcon } from '../assets';
import { InviteIcon } from '../../assets/inviteicon';
const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Add</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user ,setSelectedUsers}) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ?<InviteIcon></InviteIcon>: <div className="user-item__invite-empty" />}
        </div>
    )   
}


const UserListmod = () => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);
    const { channel } = useChannelStateContext();
    const [selectedUsers, setSelectedUsers] = useState([])
    const [Usersmoderator, setmoderators] = useState([])



    const channelid=useSelector(state=>state.channel.currentid)


    console.log(channelid);
    const getchanneldetails=axios.get(`http://localhost:3000/findchannel/${channelid}`)
    getchanneldetails.then(value=>{
        console.log(value,"sfs")
        console.log(value.data.data.channels.channelmoderator,'fsd')
        setmoderators(value.data.data.channels.channelmoderator)
    
        // setmoderators((prevUsers) => [...prevUsers, ...value.data.data.channels.channelmoderator])
    
        
    })


    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;

            setLoading(true);
            let response;
            try {
                // const response = Object.values(channel.state?.members || {}).filter(
                //   (member) => member.user?.id !== client.user?.id,  
                // );

                const getchanneldetails=axios.get(`http://localhost:3000/findchannel/${channelid}`)
                getchanneldetails.then(value=>{
                    console.log(value,"sfs")
                    console.log(value.data.data.channels.channelmoderator,'fsd')
                    setmoderators(value.data.data.channels.channelmoderator)
                     
                })
                const response = await client.queryUsers({ id: { $in: Usersmoderator } });
                console.log(Usersmoderator,"ssdfs")
                


                if(response.length) {
                //   console.log(users)
                    setUsers(response);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
              console.log(error)
               setError(true);
            }
            setLoading(false);
        }

        if(client) getUsers()
    }, []);

    if(error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
      <>
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                users?.map((user, i) => (
                  <UserItem index={i} key={user.user.id} user={user.user} setSelectedUsers={setSelectedUsers} />  
                ))
            )}
        </ListContainer>
         <Divider></Divider>
         <div className='user-list__addbutton'>
         <Button  variant="contained" >Add moderators</Button>
         </div>
        </>
    )
}

export default UserListmod;