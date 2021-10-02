import { rdb } from "../services/firebase";

export const RANDOMID = (chars, lon) => {
    let code = "";
    for (let x=0; x < lon; x++){
        var rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }
    return code
}

export const setChatsObs = async (updateFunction) => {
    const ref = rdb.ref(`chats/`);
    return await new Promise( async (resolve, reject) => {
        await ref.on("value", (snapshot) => {
            if(snapshot.val() != null){
                const arr = Object.values(snapshot.val())
                var chatTokens = Object.keys(snapshot.val())
                //data
                const data = [];
                arr.forEach((chat, index) => {
                    var viewed = chat.viewed;
                    var newMsgCounts = chat.newMsgCount;
                    var chatUsers = chat.users;
                    delete chat.viewed
                    delete chat.newMsgCount
                    delete chat.users

                    const newArray = Object.values(chat)
                    var firstMessage = newArray.splice(newArray.length - 1, 1)
                    newArray.splice(0, 0, firstMessage[0]);
                    var last = newArray.splice(newArray.length - 1, 1)

                    data.push({
                        chatToken: chatTokens[index],
                        lastMessage: last,
                        viewed,
                        newMsgCounts,
                        chatUsers
                        // totalMsg: newArray
                    })
                })
                updateFunction(data);

            }
        }, (error) => reject(error))
    })
}

export const getChatMessages = async (observerfunction) => {
        const ref = rdb.ref(`chats/`);
        return await new Promise((resolve, reject) => {
            ref.orderByChild('message').on("value", (snapshot) => {
            if(snapshot.val() != null){
                var arr = Object.values(snapshot.val())
                var chatTokens = Object.keys(snapshot.val())
                
                //data
                const data = [];
                arr.forEach((chat, index) => {
                    delete chat.viewed
                    delete chat.newMsgCount
                    delete chat.users
                    const messagesArray = Object.values(chat);
                    const firstMsg = messagesArray.splice(messagesArray.length - 1, 1);
                    messagesArray.splice(0, 0, firstMsg[0]);
                    data.push({
                        chatToken: chatTokens[index],
                        messages: messagesArray
                    })
                })
                    observerfunction(data);
                }
            }, (error) => {
                reject(error);
            })
        })
}