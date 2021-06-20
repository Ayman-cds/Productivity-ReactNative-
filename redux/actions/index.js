import firebase from 'firebase';
import { USER_STATE_CHANGE } from '../constants';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export function fetchUser() {
    return (dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log('SNAPSHOT', snapshot.data());
                    dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: snapshot.data(),
                    });
                } else {
                    console.log(
                        'THIS USER DOES NOT EXIST',
                        firebase.auth().currentUser.uid
                    );
                }
            });
    };
}