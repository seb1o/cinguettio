import { Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: "AIzaSyB9p-EFuEo9X6HfwG8-mwbOFxqyHHsK2MU",
    authDomain: "cinguetto-8c580.firebaseapp.com",
    projectId: "cinguetto-8c580",
    storageBucket: "cinguetto-8c580.firebasestorage.app",
    messagingSenderId: "936685971905",
    appId: "1:936685971905:web:2a7a1c3ab0e36c3ac52740",

  };
  db?: any;
  cinguettii = signal<Cinguettio[]>([])


  constructor() { }
  init() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  async getAllCinguettii() {
    // const newArray: Cinguettio[] = [];
    // const querySnapshot = await getDocs(collection(this.db, "cinguetti"));
    // querySnapshot.forEach((doc) => {
    //   const newCinguettio: Cinguettio = doc.data() as Cinguettio;
    //   newCinguettio.id = doc.id;
    //   newArray.push(newCinguettio)
    // });
    // console.log(newArray)
    // this.cinguettii.update((_) => newArray)

    const newArray: Cinguettio[]= [];
    const unsubscribe = onSnapshot(collection(this.db, "cinguetti"), (snap)=> {
      snap.forEach((doc) =>{
        const newCinguettio = doc.data() as Cinguettio;
        newCinguettio.id = doc.id;
        newArray.push(newCinguettio);
      });
      this.cinguettii.update((_) => newArray)
    })
  }
}



