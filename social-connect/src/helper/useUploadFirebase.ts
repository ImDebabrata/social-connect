import { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";

const useFirebaseImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<null | number>(null);
  const [error, setError] = useState<StorageError | any>(null);

  useEffect(() => {
    setUploadProgress(null);
    setError(null);
  }, [error, uploadProgress]);

  const uploadImage = async (
    blob: Blob,
    folderPath: string,
    fileName: string,
    callbackFunction: Function
  ) => {
    try {
      // Create file metadata
      const metadata = {
        contentType: blob.type,
      };
      // Upload file and metadata to Firebase Storage
      const storageRef = ref(storage, `${folderPath}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Nei pata bhai");
          }
        },
        (error) => {
          setError(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            callbackFunction(url);
          });
        }
      );
    } catch (error) {
      setError(error);
    }
  };

  return {
    uploadImage,
    uploadProgress,
    error,
  };
};

export default useFirebaseImageUpload;
