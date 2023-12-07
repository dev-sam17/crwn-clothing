import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA18ocJQRMsMKNXxV6hYT2afwm8UwYMhm0",
    authDomain: "crwn-clothingdb-6753b.firebaseapp.com",
    projectId: "crwn-clothingdb-6753b",
    storageBucket: "crwn-clothingdb-6753b.appspot.com",
    messagingSenderId: "275251148526",
    appId: "1:275251148526:web:aad4a14ae6ac1c00ab65ff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()   

provider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return userDocRef;
}