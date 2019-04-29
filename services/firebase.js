import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
	apiKey: 'AIzaSyBq6aXF7F_TK2TTGBeHE26qgqTlvDVCPiA',
	authDomain: 'testovoe-5b68a.firebaseapp.com',
	databaseURL: 'https://testovoe-5b68a.firebaseio.com',
	projectId: 'testovoe-5b68a',
	storageBucket: 'testovoe-5b68a.appspot.com',
	messagingSenderId: '915193684360'
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
