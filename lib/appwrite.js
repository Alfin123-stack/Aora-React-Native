import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.alfin.aora",
  projectId: "672c3804002c56e29c29",
  databaseId: "672c3c34003442ddf783",
  savedVideoCollectionId: "67513cc60005e3442562",
  userCollectionId: "672c3d1d000e0ade5cb4",
  videoCollectionId: "672c3d6c00304aec26d4",
  storageId: "672c46850013914fec0a",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storages = new Storage(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(client);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error();

    return session;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPost = async () => {
  try {
    const allPost = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return allPost.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const getLatePost = async () => {
  try {
    const latePost = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return latePost.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const searchPost = async (query) => {
  try {
    const searchPost = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    console.log("Dokumen yang ditemukan:", searchPost.documents);
    return searchPost.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const getUserPost = async (userId) => {
  try {
    const userPost = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return userPost.documents;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const getFilePreview = async (id, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storages.getFileView(appWriteConfig.storageId, id);
    } else if (type === "image") {
      fileUrl = storages.getFileView(
        appWriteConfig.storageId,
        id,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid File Type");
    }

    if (!fileUrl) throw new Error("File not found");

    return fileUrl;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  // FOR DOCUMENT PICKER
  // const { mimeType, ...rest } = file;
  // const asset = {
  //   type: mimeType,
  //   ...rest,
  // };

  //FOR IMAGE PICKER
  const asset = {
    name: file.fileName,
    size: file.fileSize,
    type: file.mimeType,
    uri: file.uri,
  };
  try {
    const uploadedFile = await storages.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const addFile = async (form) => {
  try {
    const [videoUrl, thumbailUrl] = await Promise.all([
      uploadFile(form.video, "video"),
      uploadFile(form.thumbnail, "image"),
    ]);

    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        video: videoUrl,
        thumbnail: thumbailUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const getSavedVideosByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required but not provided.");
    }

    // Step 1: Ambil semua entri dari tabel `savedVideos`
    const savedVideos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.savedVideoCollectionId
    );
    // console.log(savedVideos.documents);
    // Filter savedVideos berdasarkan userId di sisi aplikasi
    const userSavedVideos = savedVideos.documents;
    const userVideos = userSavedVideos.filter(
      (saved) => saved.user[0].$id === userId
    );

    const videos = userVideos.map((saved) => saved.video);

    return videos.flat();
  } catch (error) {
    console.log("Error in getSavedVideosByUserId:", error.message);
    throw new Error("Failed to get saved videos");
  }
};

//add videos to bookmark

export const addToSavedVideos = async (userId, videoId) => {
  try {
    if (!userId || !videoId) {
      throw new Error("User ID or Video ID is required but not provided.");
    }

    // Membuat relasi dengan menyimpan ID dokumen pengguna dan video
    const newSavedVideo = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.savedVideoCollectionId,
      ID.unique(),
      {
        user: [userId], // Array ID dokumen untuk relasi
        video: [videoId], // Array ID dokumen untuk relasi
      }
    );

    return newSavedVideo;
  } catch (error) {
    console.log("Error in addToBookmark:", error.message);
    throw new Error("Failed to add video to bookmark");
  }
};

export const deleteFromSavedVideos = async (userId, videoId) => {
  try {
    if (!userId || !videoId) {
      throw new Error("User ID or Video ID is required but not provided.");
    }

    // Step 1: Fetch all saved videos
    const savedVideos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.savedVideoCollectionId
    );
    

    // Step 2: Find the saved video entry matching the userId and videoId
    const videoToDelete = savedVideos.documents.find(
      (saved) => saved.user[0].$id === userId && saved.video[0].$id === videoId
    );

    if (!videoToDelete) {
      throw new Error("Saved video not found.");
    }

    // Step 3: Delete the saved video document
    await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.savedVideoCollectionId,
      videoToDelete.$id // Delete the document by its unique ID
    );

    return { message: "Video removed from saved videos." };
  } catch (error) {
    console.log("Error in deleteFromSavedVideos:", error.message);
    throw new Error("Failed to delete video from saved videos.");
  }
};
