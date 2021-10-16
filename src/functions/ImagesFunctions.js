// Images

import { storage } from "../services/firebase";
import { RANDOMID } from "./ChatObservers";

export const getBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
    })
}
export const handleOptimizedImg = async (file, width, height) => {
    const img = await getBase64(file);
    let modifying = false;
    let one = 0;
    return new Promise((resolve, reject) => {
        //set image into a image tag
        let imge = new Image();
        imge.src = img;
        imge.crossOrigin="anonymous"

        if(!modifying && one === 0){
            modifying = true;                

            //image onload
            imge.onload = () => {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.height = height ? imge.naturalHeight/2 : 264;
                canvas.width = width ? imge.naturalWidth/2 : 396;
                ctx.drawImage(imge, 0, 0, imge.width, imge.height, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/png", 1));
                one+=1

            }
             //image onerror
            imge.onerror = (error) => {
                reject(error); 
            }  
        }
    })
}

export const uploadImages = async (img, channel, store, postid, stateF) => {
    const storageRef =  storage.ref(`${store}/${channel}/${postid}`);
    const metadata = {
        contentType: "image/png"
    }
    return new Promise((resolve, reject) => {
        const task = storageRef.putString(img[0], 'data_url', metadata);
        task.on("state_changed",
        (snapshot) => {
            var progress = parseInt(snapshot.task.snapshot.bytesTransferred / snapshot.task.snapshot.totalBytes * 100); 
            stateF(progress)
        },
        (error) => {
            reject(error)
        },
        () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                if(img.length >= 2){
                    const urls = [];
                    urls.push(url);
                    resolve(urls);
                }
                else if (img.length == 1){
                    resolve(url);
                }
            })
        })
    })
}