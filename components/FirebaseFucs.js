import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const ref = firebase.firestore().collection('users');

export const getAllData = async (uid) => {
    const result = await ref.doc(uid).get();
    const data = result.data();
    console.log(data);
    return data;
};
