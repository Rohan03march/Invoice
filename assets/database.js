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
    if (!empId) return alert("Employee ID is required");
  
    const empData = {
      name: document.getElementById('empName').value,
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
  
  