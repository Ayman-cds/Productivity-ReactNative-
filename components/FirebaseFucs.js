import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const ref = firebase.firestore().collection('users');

export function getAllData(uid) {
    try {
        let data = [];
        ref.doc(uid)
            .get()
            .then((result) => {
                data = result.data();
            });
        return data;
    } catch (error) {
        console.error('ERROR IN getAllData FIREBASEFUCS-->', error);
    }
}

export const updateUncompletedTasks = async (uid, tasks) => {
    try {
        const result = await ref.doc(uid).update({
            tasks,
        });
    } catch (error) {
        console.error('ERROR IN updateUncompletedTasks FIREBASEFUCS-->', error);
    }
};

export const updateStats = async (uid, stats) => {
    try {
        const result = await ref.doc(uid).update({
            stats,
        });
    } catch (error) {
        console.error('ERROR IN updateStats FIREBASEFUCS-->', error);
    }
};
