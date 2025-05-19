import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth signal<boolean>(false);

  constructor() { 

    const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        
        console.log('auth change authorized', user);
        this.isAuth.set(true);
        // ...
      } else {
        // User is signed out
        console.log('auth change not authorized');
        this.isAuth.set(false);
      });
    }
  

  firebaseLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('evviva', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
}
}