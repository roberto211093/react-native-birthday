import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDBHJQ56cPSWiRgUxyLFv-zCVB25lSjqLI',
  authDomain: 'birthday-app-react-native.firebaseapp.com',
  databaseURL: 'https://birthday-app-react-native.firebaseio.com',
  projectId: 'birthday-app-react-native',
  storageBucket: 'birthday-app-react-native.appspot.com',
  messagingSenderId: '190988762301',
  appId: '1:190988762301:web:ffcac30001f16257c00bd4',
};

export default firebase.initializeApp(firebaseConfig);
