import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import AdminDrawer from '../components/Admin/AdminDrawer'
import AdminChatList from '../components/Chat/AdminChatList'
import { AllRoutes } from '../constants/routes/AllRoutes'
import "../Styles/AdminDashboard.css"
import "../Styles/AdminChat.css"
import AdminMessagesView from '../components/Chat/AdminMessagesView'
import { getChatMessages, setChatsObs } from '../functions/ChatObservers'
import { useDispatch } from 'react-redux'
import { setAllMessages, setChatsList } from '../services/reduxToolkit/chatStates/actions'
import { useSelector } from 'react-redux'
import { currentChatList, currentMessagesList, useCurrentChatID } from '../services/reduxToolkit/chatStates/selectors'
import { Functions } from './AdminDashboardPage'
import { rdb } from '../services/firebase'
import DeleteChat from '../components/Chat/DeleteChat'
import AdminChatDashboard from '../components/Chat/AdminChatDashboard'


export default function AdminChat() {
    const ChatList = useSelector(currentChatList);
    const ChatId = useSelector(useCurrentChatID);
    const ChatsMessages = useSelector(currentMessagesList);
    const CurrentMessagesList = () => ChatsMessages.filter(chat => chat.chatToken === ChatId);
    const [delId, setdelId] = useState({id: "", in: false})

    const dispatch = useDispatch();

    // const updateChatList = (result) => {
    //     dispatch(setChatsList(result));
    // }
    // const updateChatMessages = () => {
    //     getChatMessages((result) => {
    //         dispatch(setAllMessages(result));
    //     })
    // }

    // useEffect(() => {
    //     setChatsObs(updateChatList);
    // }, [])

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ justifyContent: "flex-start", flexFlow: "column", padding: "20px", alignItems: "center"}}>
                {/* <AdminChatList data={ChatList} updateChatMessages={updateChatMessages} delChat={(key) => setdelId({id: key, in: true})} /> */}
                {/* <AdminMessagesView messagesList={CurrentMessagesList()} chatUp={updateChatMessages} /> */}
                <AdminChatDashboard />
            </div>
            {/* {delId.in && <DeleteChat data={ChatList.length} dRef={rdb.ref(`chats/`)} delId={delId.id} cancel={() => setdelId({id: "", in: false})} />} */}
        </div>
    )
}
