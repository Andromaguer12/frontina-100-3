import { configureStore } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import userWithGoogle from "./userWithGoogle/actions"
import adminUser from "./adminUserLogin/actions"
import ChatState from "./chatStates/actions"


const AppReducers = {
    userWithGoogle,
    adminUser,
    ChatState
}

export default configureStore({
    reducer: AppReducers,
    middleware: [thunk],
    devTools: true
})