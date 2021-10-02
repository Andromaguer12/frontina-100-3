import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatsList: [],
    chatsMessages: [],
    currentChatID: "",
    selectedMsg: null
}

const ChatState = createSlice({
    name: "ChatState",
    initialState,
    reducers: {
        setChatsList: (state, action) => {
            state.chatsList = action.payload
        },
        setCurrentChatID: (state, action) => {
            state.currentChatID = action.payload
        },
        setAllMessages: (state, action) => {
            state.chatsMessages = action.payload
        },
        selectMsg: (state, action) => {
            const currentChat = state.chatsMessages.filter((list) => list.chatToken === state.currentChatID);
            const selectedMsg = currentChat[0]?.messages.filter((msg) => msg.id === action.payload);
            state.selectedMsg = selectedMsg;
        }
    }
})

export const { setChatsList, setCurrentChatID, setAllMessages, selectMsg } = ChatState.actions

export default ChatState.reducer