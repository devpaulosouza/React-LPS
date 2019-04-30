import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from 'firebase';

import firebaseConfig from './config/firebaseConfig';

const firebaseInstance = firebase.initializeApp(firebaseConfig);

const rsf = new ReduxSagaFirebase(firebaseInstance);

export { rsf as firebase };
