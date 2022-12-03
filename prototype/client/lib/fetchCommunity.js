import { doc, getDoc, collection, query, getDocs, addDoc, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import axios, * as others from 'axios';

const BACKEND_URL = "http://localhost:3080"

export async function isCommunityExist(name) {
    const ref = doc(firestore, `communities/${name}`)
    const docSnap = await getDoc(ref);
    const isValid = docSnap.exists()

    return isValid
}

export async function searchCommunity(name) {
    //TODO
}

export async function getCommunityUsers(name) {
    const q = query(collection(firestore, `communities/${name}/users`));
    const querySnapshot = await getDocs(q);

    return querySnapshot
}

export async function getCommunityPosts(name) {
    const q = query(collection(firestore, `communities/${name}/posts`), where("isDeleted", "==", false));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
}

export async function addCommunityPosts(communityName, postTitle, postType, postURL, postContent, postUser) {
    const communityPostRef = collection(firestore, `communities/${communityName}/posts`);
    const docRef = await addDoc(communityPostRef, {
        title: postTitle,
        type: postType,
        url: postURL,
        content: postContent,
        user: postUser,
        isDeleted: false,
        timestamp: serverTimestamp()
    })
}

export async function getYoutubeByName(name) {
    const res = await axios.get(`${BACKEND_URL}/api/getvideo`, { params: { title: name } });
    return res.data;
}

export async function getYoutubeById(id) {
    const res = await axios.get(`${BACKEND_URL}/api/getvideobyid`, { params: { videoId: id } });
    return res.data;
}

export async function getSpotifyByName(name) {
    //TODO
}

export async function deleteCommunityPosts(communityName, postId, uid) {
    // First get a reference of the post document
    // Check if the post is indeed posted by the user
    const docRef = doc(firestore, `communities/${communityName}/posts/${postId}`);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
        console.log("Deletion Error: the document does not exist.")
        return;
    }

    if (docSnap.data().user !== uid) {
        console.log("Deletion Error: you should not delete other people's post.")
        return;
    }

    if (docSnap.data().isDeleted === true) {
        console.log("Deletion Error: the post is already deleted.")
        return;
    }

    // Then we can delete the post by setting the isDelete attribute to true.
    await updateDoc(docRef, {
        isDeleted: true
    })

    console.log("Deleted post successfully!");
}

export async function addCommunityUser(communityName, user) {
    //TODO
}

export async function deleteCommunityUser(communityName, user) {
    //TODO
}

