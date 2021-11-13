import db, { auth, googleProvider, rdb, usersRef } from '../services/firebase'
import { RANDOMID } from './ChatObservers';

export const createNewChannel = async (chatToken) => {
    return new Promise(async (response, reject) => {
        const time = new Date().getTime();
        const newMsgCount = {
            adminUser: 1,
            customer: 0
        }
        if(chatToken != ""){
            var ref = rdb.ref(`chats/` + chatToken);
            await ref.set({
                firstMessage: {
                    sender: false,
                    timestamp: time,
                    message: "Chat en vivo!"
                },
                // users: chatUsers,
                newMsgCount,
                viewed: false
            }).then(() => {
                response(true)
            }).catch(error => {
                console.log(error)
                reject(false)
            })             
        }
    })
}

export const getUserDoc = async (email, name) => {
    return new Promise( async (resolve, reject) => {
        await usersRef.doc(`${email}`).onSnapshot(doc => {
            if(doc.exists){
                var obj = {
                    id: doc.id,
                    ...doc.data()
                }
                resolve(obj)
            }
            else{
                const newUserData = {
                    chatToken: "dRjaS5X-qqjo9SX",
                    name: name,
                    muted: false,
                    createDate: new Date().getTime(),
                    lastConnection: new Date().getTime(),
                    img: auth.currentUser.photoURL,
                    auth: "user",
                    secondaryAuth: "any"
                }
                usersRef.doc(`${email}`).set(newUserData).then(async () => {
                    await usersRef.doc(`${email}`).get().then((doc) => {
                        var obj = {
                            id: doc.id,
                            ...doc.data()
                        }
                        resolve(obj)
                    }).catch((error) => reject(error));
                })
            }
        })
    })
}

export const logIn = async (email, pass) => {
    return await new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, pass).then(async (authdata) => {
                await getUserDoc(auth.currentUser.email).then(doc => {
                    const array = [
                        auth.currentUser, 
                        doc
                    ]
                    resolve(array);
                });
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getCurrentUser = () => auth.onAuthStateChanged((user) => {
    if (user) {
        return user
    }
    else{
        return null
    }
})

export const signOut = () => {
    return auth.signOut();
}

export const signInWithGoogle = async () => {
    return await new Promise((resolve, reject) => {
        auth.signInWithPopup(googleProvider).then(async (result) => {
            await getUserDoc(result.user.email, result.user.displayName).then((userDoc) => {
                const credentials = {
                    credential: result.credential,
                    token: result.token,
                    user: result.user,
                }
                resolve([credentials, userDoc])
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const handleGetAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        await usersRef.get().then((docs) => {
            const users = [];
            docs.forEach((doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            })
            resolve(users)
        }).catch(error => reject(error))
    })
}