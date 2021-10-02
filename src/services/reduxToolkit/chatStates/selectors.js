import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { autoSelect } from '../autoSelect'

export const currentChatList = createDraftSafeSelector(
    autoSelect,
    (state) => state.ChatState.chatsList
)

export const useCurrentChatID = createDraftSafeSelector(
    autoSelect,
    (state) => state.ChatState.currentChatID
)

export const currentMessagesList = createDraftSafeSelector(
    autoSelect,
    (state) => state.ChatState.chatsMessages
)

export const getSelectedMessage = createDraftSafeSelector(
    autoSelect,
    (state) => state.ChatState.selectedMsg
)