//FIREBASE 
  // Initialize Firebase (no import needed)
  const firebaseConfig = {
    apiKey: "AIzaSyDYGv3wLNdUjQsFdF23vDvdlEpm3pCnHZo",
    authDomain: "employee-90fe1.firebaseapp.com",
    projectId: "employee-90fe1",
    databaseURL: "https://employee-90fe1-default-rtdb.firebaseio.com/",
    storageBucket: "employee-90fe1.firebasestorage.app",
    messagingSenderId: "799428096394",
    appId: "1:799428096394:web:895deb0efe403e147f1873"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  
  document.querySelector('.add-btn').addEventListener('click', () => {
    const empId = document.getElementById('empId').value.trim();
    const empName = document.getElementById('empName').value.trim();
  
    if (!empId || !empName) {
      alert("Employee ID and Name are required");
      return;
    }
  
    // Check if empId exists
    db.ref('employees/' + empId).once('value').then(snapshot => {
      if (snapshot.exists()) {
        alert("This Employee ID already exists.");
        return;
      }
  
      // Check if empName already exists
      db.ref('employees').once('value').then(snapshot => {
        let nameExists = false;
  
        snapshot.forEach(child => {
          const childData = child.val();
          if ((childData.name || '').toLowerCase() === empName.toLowerCase()) {
            nameExists = true;
          }
        });
  
        if (nameExists) {
          alert("This Employee Name already exists.");
          return;
        }
  
        // If both checks pass, save data
        const empData = {
          name: empName,
          designation: document.getElementById('designation').value,
          department: document.getElementById('department').value,
          bankName: document.getElementById('bankName').value,
          accNumber: document.getElementById('accNumber').value,
          IFSC: document.getElementById('IFSC').value,
          Branch: document.getElementById('Branch').value
        };
  
        db.ref('employees/' + empId).set(empData)
          .then(() => alert('Employee details saved!'))
          .catch(error => console.error('Error:', error));
      });
    });
  });

  document.querySelector('.update-btn').addEventListener('click', () => {
    const empId = document.getElementById('empId').value.trim();
    if (!empId) {
      alert("Employee ID is required to update.");
      return;
    }
  
    const updatedData = {
      name: document.getElementById('empName').value,
      designation: document.getElementById('designation').value,
      department: document.getElementById('department').value,
      bankName: document.getElementById('bankName').value,
      accNumber: document.getElementById('accNumber').value,
      IFSC: document.getElementById('IFSC').value,
      Branch: document.getElementById('Branch').value
    };
  
    db.ref('employees/' + empId).once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          alert("No such Employee ID exists to update.");
          return;
        }
  
        db.ref('employees/' + empId).update(updatedData)
          .then(() => alert('Employee details updated!'))
          .catch(error => console.error('Error updating:', error));
      });
  });
  
  
  
  function autofillForm(data) {
    document.getElementById('empName').value = data.name || '';
    document.getElementById('designation').value = data.designation || '';
    document.getElementById('department').value = data.department || '';
    document.getElementById('bankName').value = data.bankName || '';
    document.getElementById('accNumber').value = data.accNumber || '';
    document.getElementById('IFSC').value = data.IFSC || '';
    document.getElementById('Branch').value = data.Branch || '';
  }
  
  document.getElementById('empId').addEventListener('blur', () => {
    const empId = document.getElementById('empId').value.trim();
    if (!empId) return;
  
    db.ref('employees/' + empId).once('value')
      .then(snapshot => {
        if (snapshot.exists()) autofillForm(snapshot.val());
      });
  });
  
  document.getElementById('empName').addEventListener('blur', () => {
    const name = document.getElementById('empName').value.trim().toLowerCase();
    if (!name) return;
  
    db.ref('employees').once('value').then(snapshot => {
      snapshot.forEach(child => {
        const childData = child.val();
        if ((childData.name || '').toLowerCase() === name) {
          autofillForm(childData);
          document.getElementById('empId').value = child.key;
        }
      });
    });
  });
  
  