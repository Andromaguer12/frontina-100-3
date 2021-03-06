import { configureStore } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import userWithGoogle from "./userWithGoogle/actions"
import adminUser from "./adminUserLogin/actions"
import ChatState from "./chatStates/actions"
import PublicCurrentPages from "./PublicCurrentPage/actions"


const AppReducers = {
    userWithGoogle,
    adminUser,
    ChatState,
    PublicCurrentPages
}

export default configureStore({
    reducer: AppReducers,
    middleware: [thunk],
    devTools: false
})