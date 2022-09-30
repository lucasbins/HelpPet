import { signInWithEmailAndPassword } from "firebase/auth";
import { 
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, app } from "../config/auth";

//const db = getFirestore(app);

const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

export const useApi = () => ({
  signin: async (email, password) => { 
    let user = null
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logou")
        user = userCredential.user;
        AsyncStorage.setItem("USER",JSON.stringify(user))
      })
      .catch((error) => {
        console.log(error);
        return true;
      });
    return user.uid;
  },
  signOut: async () => {
    try{
      await AsyncStorage.removeItem("USER")
      console.log('usuario removido')
    }catch(e){
      console.log(e)
    }
  },
  getPets: async (user_uid) => {
    const q = query(collection(db, "pets"), where("user_uid", "==", user_uid));
    const querySnapshot = await getDocs(q);
    let pet = []
    querySnapshot.forEach((doc) => { 
      pet.push(doc.data());
    })
    console.log('Buscou Pets')
    return pet
  },
  setPets: async (docData) => {
    docData.uuid = create_UUID()
    await setDoc(doc(db, "pets", docData.uuid), docData);
    console.log('Criou pet')
  },
  updatePet: async (docData) =>{
    await updateDoc(doc(db, "pets", docData.uuid), docData);
    console.log('Alterou pet')
  },
  deletePet: async (uuid) => {
    await deleteDoc(doc(db, "pets", uuid));
    console.log('Apagou pet')
  },
  getVacs: async (pet_uid) => {
    const q = query(collection(db, "vacs"), where("pet_uid", "==", pet_uid));
    const querySnapshot = await getDocs(q);
    let vacs = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      vacs.push(doc.data());
    })
    console.log('Buscou Vacinas')
    return vacs
  },
  setVac: async (docData) => {
    docData.uid = create_UUID()
    await setDoc(doc(db, "vacs", docData.uid), docData);
    console.log('Adicionou Vacina')
  },
  updateVac: async (docData) =>{
    await updateDoc(doc(db, "vacs", docData.uid), docData);
    console.log('Alterou Vacina')
  },
  deleteVac: async (uid) => {
    await deleteDoc(doc(db, "vacs", uid));
    console.log('Deletou Vacina')
  },
  getMeds: async (petUid) => {
    const q = query(collection(db, "medicamento"), where("petUid", "==", petUid));
    const querySnapshot = await getDocs(q);
    let meds = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      meds.push(doc.data());
    })
    console.log('Buscou Medicamentos')
    return meds
  },
  setMed: async (docData) => {
    docData.uid = create_UUID()
    await setDoc(doc(db, "medicamento", docData.uid), docData);
    console.log('Adicionou Medicamento')
  },
  updateMed: async (docData) =>{
    await updateDoc(doc(db, "medicamento", docData.uid), docData);
    console.log('Alterou Medicamento')
  },
  deleteMed: async (uid) => {
    await deleteDoc(doc(db, "medicamento", uid));
    console.log('Deletou medicamento')
  },
  getAnti: async (petUid) => {
    const q = query(collection(db, "antiparasitario"), where("petUid", "==", petUid));
    const querySnapshot = await getDocs(q);
    let Anti = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      Anti.push(doc.data());
    })
    console.log('Buscou Antiparasitario')
    return Anti
  },
  setAnti: async (docData) => {
    docData.uid = create_UUID()
    await setDoc(doc(db, "antiparasitario", docData.uid), docData);
    console.log('Adicionou Antiparasitario')
  },
  updateAnti: async (docData) =>{
    await updateDoc(doc(db, "antiparasitario", docData.uid), docData);
    console.log('Alterou Antiparasitario')
  },
  deleteAnti: async (uid) => {
    await deleteDoc(doc(db, "antiparasitario", uid));
    console.log('Deletou antiparasitario')
  }
})

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}