// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxZ1S5XQJ5Z2Npl0ieLK11TL1vV4x_RuY",
    authDomain: "zteller-db.firebaseapp.com",
    databaseURL: "https://zteller-db-default-rtdb.firebaseio.com",
    projectId: "zteller-db",
    storageBucket: "zteller-db.appspot.com",
    messagingSenderId: "128473911502",
    appId: "1:128473911502:web:b59b64242d72ef1f36409f",
    measurementId: "G-E1S0ETVF7P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function saveStudentData(school, matno, studentDetails) {
  const studentRef = ref(database, 'students/' + school + '/' + matno);
  return push(studentRef, studentDetails);
}


function submitForm() {
    const school = document.getElementById('firstDropdown').value;
    const matno = document.querySelector('input[name="matno"]').value;
  
    // Collect all other form details
    const studentDetails = {
      surname: document.querySelector('input[name="surname"]').value,
      firstname: document.querySelector('input[name="firstname"]').value,
      othername: document.querySelector('input[name="othername"]').value,
      email: document.querySelector('input[name="email"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      department: document.getElementById('thirdDropdown').value,
      level: document.getElementById('fourthDropdown').value,
      payment: document.getElementById('fifthDropdown').value,
      association: document.getElementById('association').value,
      gender: document.querySelector('input[name="gender"]:checked')?.value
    };
  
    // Save student data to Firebase
    saveStudentData(school, matno, studentDetails)
      .then(() => {
        console.log('Student data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving student data: ', error);
      });
  }