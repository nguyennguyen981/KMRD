import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
   apiKey: "AIzaSyD92WUfyAk3kTnhh1C-okN-tuCxtJOPxoU",
   authDomain: "kmrd-634b3.firebaseapp.com",
   databaseURL: "https://kmrd-634b3.firebaseio.com",
   projectId: "kmrd-634b3",
   storageBucket: "kmrd-634b3.appspot.com",
   messagingSenderId: "23054426187",
   appId: "1:23054426187:web:d4d38b7d0aa144fe3b2dce"
 };

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
