import { inject, Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";

import { addDoc, collection, getDocs, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';
import { LocationService } from '../../service/location/location.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: "AIzaSyA7ymoFr6ZVE0AEy-SNkrpLws95vcMq-cc",
    authDomain: "cinguetto-69d31.firebaseapp.com",
    projectId: "cinguetto-69d31",
    storageBucket: "cinguetto-69d31.firebasestorage.app",
    messagingSenderId: "1001473759556",
    appId: "1:1001473759556:web:6027bafeb24555a1f99f11"
  };
  db?: any;
  cinguettii = signal<Cinguettio[]>([])

 locationServ = inject(LocationService);
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

    const unsubscribe = onSnapshot(collection(this.db, "cinguettii"), (snap) => {

      const newArray: Cinguettio[] = [];

      snap.forEach((doc) => {

        // const newCinguettio: Cinguettio = {id: doc.id, ...doc.data()}

        const newCinguettio = doc.data() as Cinguettio;

        newCinguettio.id = doc.id;

        newArray.push(newCinguettio);

      });

      this.cinguettii.update((_) => newArray);

    })




  }
  async postCinguettio(cinguettioText: string) {
    const newCinguettio: Cinguettio = {
      text: cinguettioText,
      creationTime: Timestamp.now(),
    }

    this.locationServ.getLocation()
    .then(loc => {
      newCinguettio.location = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      }
      const path = collection(this.db, "cinguettii");
      addDoc(path, newCinguettio)
    })
    .catch(err => {
      console.log(err)
    const path = collection(this.db, "cinguettii");
    addDoc(path, newCinguettio)
  }); 
    // const path = collection(this.db, "cinguettii");
    // await addDoc(path, newCinguettio)
  
}
}


