import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  where,
  setDoc,
  deleteDoc,
  getFirestore,
  limit,
} from "firebase/firestore";
import { firestore } from "./firebase";
import axios, * as others from "axios";

const BACKEND_URL = "http://localhost:3080";

export async function isCommunityExist(name) {
  const ref = doc(firestore, `communities/${name}`);
  const docSnap = await getDoc(ref);
  const isValid = docSnap.exists();

  return isValid;
}

export async function searchCommunity(name) {
  const communitiesRef = collection(firestore, "communities");
  const q = query(communitiesRef, where("__name__", ">=", name), limit(5));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  //let matchingCommunities = []
  //getDocs(colRef)
  //    .then((snapshot) => {
  //        snapshot.docs.forEach((doc) => {
  //            if (doc.getString('name').includes(name)) {
  //                matchingCommunities.push(doc)
  //            }
  //        }
  //        )
  //    })

  return [];
}

export async function getCommunityUsers(name) {
  const q = query(collection(firestore, `communities/${name}/users`));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

export async function getCommunityPosts(name) {
  const q = query(
    collection(firestore, `communities/${name}/posts`),
    where("isDeleted", "==", false)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

export async function getUser(id) {
  const ref = doc(firestore, `users/${id}`);
  const docSnap = await getDoc(ref);

  return docSnap;
}

export async function addCommunityPosts(
  communityName,
  postTitle,
  postType,
  postURL,
  postContent,
  postUser
) {
  const communityPostRef = collection(
    firestore,
    `communities/${communityName}/posts`
  );
  const docRef = await addDoc(communityPostRef, {
    title: postTitle,
    type: postType,
    url: postURL,
    content: postContent,
    user: postUser,
    isDeleted: false,
    timestamp: serverTimestamp(),
  });
}

export async function getYoutubeByName(name) {
  const res = await axios.get(`${BACKEND_URL}/api/getvideo`, {
    params: { title: name },
  });
  return res.data;
}

export async function getYoutubeById(id) {
  const res = await axios.get(`${BACKEND_URL}/api/getvideobyid`, {
    params: { videoId: id },
  });
  return res.data;
}

export async function getSpotifyById(id) {
  const res = await axios.get(`${BACKEND_URL}/api/getsongbyid`, {
    params: { songId: id },
  });
  return res.data;
}

export async function deleteCommunityPosts(communityName, postId, uid) {
  // First get a reference of the post document
  // Check if the post is indeed posted by the user
  const docRef = doc(firestore, `communities/${communityName}/posts/${postId}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("Deletion Error: the document does not exist.");
    return;
  }

  if (docSnap.data().user !== uid) {
    console.log("Deletion Error: you should not delete other people's post.");
    return;
  }

  if (docSnap.data().isDeleted === true) {
    console.log("Deletion Error: the post is already deleted.");
    return;
  }

  // Then we can delete the post by setting the isDelete attribute to true.
  await updateDoc(docRef, {
    isDeleted: true,
  });

  console.log("Deleted post successfully!");
}

export async function addCommunityUser(communityName, uid, username) {
  // Check if the community exists
  const communityRef = doc(firestore, `communities/${communityName}`);
  const communitySnap = await getDoc(communityRef);

  if (!communitySnap.exists()) {
    console.log("Error: community does not exists.");
    return;
  }

  // Add user to the community
  const userRef = doc(firestore, `communities/${communityName}/users/${uid}`);
  await setDoc(userRef, {
    username: username,
  });

  console.log("Successfully added a user!");
}

export async function deleteCommunityUser(communityName, uid) {
  // Check if the community exists
  const communityRef = doc(firestore, `communities/${communityName}`);
  const communitySnap = await getDoc(communityRef);

  if (!communitySnap.exists()) {
    console.log("Error: community does not exists.");
    return;
  }

  // Check if the user exists in the community
  const userRef = doc(firestore, `communities/${communityName}/users/${uid}`);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.log("Error: user does not exists under this community.");
    return;
  }

  // Remove user from the collection
  await deleteDoc(userRef);

  console.log("Successfully deleted user!");
}
