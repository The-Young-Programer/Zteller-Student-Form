// script.js

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
   if (n == 2) {
   populateReviewSection();
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("step");
  // Exit the function if any field in the current tab is invalid or not selected
  if (n == 1 && (!validateForm() || !allDropdownsSelected())) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
   
    submitForm();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  
}


//////////////////////////////////////////////////////////////


function submitForm() {
  // Create an object to hold form data
  const formData = {};
  const formElements = document.getElementById("signUpForm").elements;

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== "button" && formElements[i].type !== "submit") {
      formData[formElements[i].name] = formElements[i].value;
    }
  }

  // Send the form data to the server using fetch
  fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.paymentLink) {
        // Construct the payment URL with pre-filled parameters
        const { first_name, last_name, email, mat_number, association } = formData;
        
        // Append the form data as query parameters to the Paystack URL
        const paymentUrl = `${data.paymentLink}?first_name=${encodeURIComponent(first_name)}&last_name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&mat_number=${encodeURIComponent(mat_number)}&association=${encodeURIComponent(association)}&readonly=email,mat_number,association,first_name,last_name`;
        
        // Redirect to the Paystack payment page
        window.location.href = paymentUrl;
      } else {
        alert('Error submitting form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    });
}






function allDropdownsSelected() {
  // Check if all dropdowns have a selected value
  var dropdowns = document.querySelectorAll("select.custom-select");
  for (var i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i].value === "") {
      dropdowns[i].classList.add("invalid"); // Add invalid class to dropdown
      return false;
    } else {
      dropdowns[i].classList.remove("invalid"); // Remove invalid class from dropdown
    }
  }
  return true;

  
}



function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].getElementsByTagName("input");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

const departmentsByFaculty = {
  agriculture: [
    "Department of Crop Science (CRS)",
    "Department of Animal Science (ANS)",
    "Department of Agricultural Economics",
    "Department of Soil Science & Land Management (SLM)",
    "Department of Forest Resources & Wildlife Management (FOW)",
    "Department of Aquaculture & Fisheries Management (AFM)",
    "Food Science and Nutrition (FSN)"
  ],
  arts: [
    "Philosophy",
    "Department of Theatre Arts",
    "Department of Religions",
    "Department of Linguistics Studies",
    "Foreign Languages",
    "English and Literature",
    "History and International Studies"
  ],
  education: [
    // Add departments for Education here
  ],
  engineering: [
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Electrical/Electronics Engineering",
    "Mechanical Engineering",
    "Petroleum Engineering",
    "Production Engineering",
    "Structural Engineering Department",
    "Metallurgical and Material Engineering"
  ],
  law: [
    "Private Law",
    "Public and Property Law",
    "Business Law",
    "Jurisprudence and International Law"
  ],
  lifeSciences: [
    "Animal and Environmental Biology",
    "Biochemistry",
    "Microbiology",
    "Optometry",
    "Plant Biology and Biotechnology",
    "Environmental Management and Toxicology",
    "Science Laboratory Technology"
  ],
  managementScience: [
    "Accounting",
    "Actuarial Science",
    "Banking and Finance",
    "Business Administration",
    "Human Resource Management",
    "Insurance",
    "Marketing",
    "Taxation"
  ],
  pharmacy: [
    "Pharmaceutical Chemistry",
    "Pharmaceutical Microbiology",
    "Pharmacology and Toxicology",
    "Clinical Pharmacy and Pharmacy Practice"
  ],
  physicalScience: [
    "Chemistry",
    "Computer Science",
    "Geology",
    "Mathematics",
    "Physics",
    "Statistics"
  ],
  socialScience: [
    "Economics",
    "Political Science",
    "Public Administration",
    "Geography and Regional Planning",
    "Social Work",
    "Sociology and Anthropology"
  ],
  collegeOfMedicine: [
    // Add departments for College of Medicine here
  ],
  veterinaryMedicine: [
    // Add departments for Veterinary Medicine here
  ]
};

const associationsByDepartment = {
  "Department of Crop Science (CRS)": ["Crop Science Association"],
  "Department of Animal Science (ANS)": ["Animal Science Society"],
  "Department of Agricultural Economics": ["Agricultural Economics Club"],
  "Department of Soil Science & Land Management (SLM)": ["Soil Science Association"],
  "Department of Forest Resources & Wildlife Management (FOW)": ["Forestry and Wildlife Association"],
  "Department of Aquaculture & Fisheries Management (AFM)": ["Aquaculture Society"],
  "Food Science and Nutrition (FSN)": ["Food Science Association"],
  // Add associations for other departments...
};

function updateDepartments() {
  const facultySelect = document.getElementById('secondDropdown');
  const departmentSelect = document.getElementById('thirdDropdown');
  const selectedFaculty = facultySelect.value;

  // Clear previous options
  departmentSelect.innerHTML = '<option value="" selected disabled>Select Department</option>';

  // Get the corresponding departments
  const departments = departmentsByFaculty[selectedFaculty] || [];

  // Populate the departments select tag
  departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
  });
}

function updateAssociations() {
  const departmentInput = document.getElementById('thirdDropdown');
  const associationInput = document.getElementById('fourthDropdown');
  const selectedDepartment = departmentInput.value;

  // Get the corresponding associations
  const associations = associationsByDepartment[selectedDepartment] || [];

  // Clear previous associations
  associationInput.value = ''; // Clear the input field for association

  // If there are associations, you can provide a way to select from them or just input manually
  // Here we assume user will manually input the association
}

$(document).ready(function() {
  // Initially, disable all dropdowns except the first one
  $('#secondDropdown, #thirdDropdown, #entry-mode, #fourthDropdown,  #fifthDropdown, #association').prop('disabled', true);

  // Listen for change events on the first dropdown
  $('#firstDropdown').change(function() {
    // If a value is selected in the first dropdown
    if ($(this).val()) {
      // Enable the second dropdown
      $('#secondDropdown').prop('disabled', false);
    } else {
      // If no value is selected, disable the second dropdown and subsequent ones
      $('#secondDropdown, #thirdDropdown, #entry-mode, #fourthDropdown,  #fifthDropdown, #association').prop('disabled', true);
    }
  });

  // Repeat the same process for the subsequent dropdowns
  $('#secondDropdown').change(function() {
    if ($(this).val()) {
      $('#thirdDropdown').prop('disabled', false);
    } else {
      $('#thirdDropdown, #entry-mode, #fourthDropdown,  #fifthDropdown,  #association').prop('disabled', true);
    }
    updateDepartments(); // Update the third dropdown based on the second dropdown's value
  });

  $('#thirdDropdown').change(function() {
    if ($(this).val()) {
      $('#entry-mode').prop('disabled', false);
      updateAssociations(); // Update the fourth dropdown based on the third dropdown's value
    } else {
      $(' #entry-mode, #fourthDropdown,  #fifthDropdown, #association').prop('disabled', true);
    }
  });

  $('#entry-mode').change(function() {
    if ($(this).val()) {
      $('#fourthDropdown').prop('disabled', false);
    } else {
      $('#fourthDropdown, #fifthDropdown, #association').prop('disabled', true);
    }
  });
  $('#fourthDropdown').change(function() {
    if ($(this).val()) {
      $('#fifthDropdown').prop('disabled', false);
    } else {
      $('#fifthDropdown, #association').prop('disabled', true);
    }
  });
  $('#fifthDropdown').change(function() {
    if ($(this).val()) {
      $('#association').prop('disabled', false);
    } else {
      $('#association').prop('disabled', true);
    }
  });
});

function updateAssociations() {
  var faculty = document.getElementById("secondDropdown").value;
  var associationDropdown = document.getElementById("association");

  var associations = {
    agriculture: [

      { value: "NAAS", text: "National Association of Agriculture Students (NAAS)" },
      { value: "NAAEES", text: "National Association of Agric Extension Students (NAAEES)" },
      { value: "ASSAN", text: "Animal Science Student Association of Nigeria (ASSAN)" },
      { value: "NAFIS", text: "National Association of Fishery Students (NAFIS)" },
      { value: "CROSSAN", text: "Crop Science Student Association of Nigeria (CROSSAN)" }
    ],
    socialScience: [
      { value: "SOSSA", text: "Social Sciences Students Association (SOSSA)" },
      { value: "NAPSS", text: "National Association of Political Science Students (NAPSS)" },
      { value: "NASOWS", text: "National Association of Social Work Students (NASOWS)" },
      { value: "PASAN", text: "Public Administration Student Association (PASAN)" },
      { value: "NSASA", text: "National Sociology and Anthropology Association (NSASA)" },
      { value: "GARPSAN", text: "Geography and Regional Planning Students Association (GARPSAN)" }
    ],
    managementScience: [
      { value: "MASSA", text: "Management Sciences Students Association (MASSA)" },
      { value: "NUASA", text: "Nigeria Universities Accounting Students Association (NUASA)" },
      { value: "NUAMBS", text: "Nigeria Universities Association of Management and Business Students (NUAMBS)" },
      { value: "NINSA", text: "Nigerian Insurance Student Association (NINSA)" },
      { value: "NAMS", text: "National Association of Marketing Students (NAMS)" },
      { value: "NAHRMS", text: "National Association of Human Resource Management Students (NAHRMS)" },
      { value: "FINSAN", text: "Finance Students Association of Nigeria (FINSAN)" }
    ],
    physicalScience: [
      { value: "FAPSSA", text: "Faculty of Physical Science Students Association (FAPSSA)" },
      { value: "NACOSS", text: "National Association of Computing Students (NACOSS)" },
      { value: "NAPS", text: "National Association of Physics Students (NAPS)" },
      { value: "NAMSN", text: "National Association of Mathematics Students of Nigeria (NAMSN)" },
      { value: "SCSN", text: "Students Chemical Society of Nigeria (SCSN)" },
      { value: "NASSON", text: "National Association of Statistics Students of Nigeria (NASSON)" },
      { value: "NMGS", text: "Nigeria Mining and Geosciences Society (NMGS)" }
    ],
    environmentalScience: [
      { value: "FESSA", text: "Faculty of Enviromental Sciences Students Association (FESSA)" },
      { value: "EMSA", text: "Estate Management Students Association (EMSA)" },
      { value: "NIGS", text: "Nigerian Institute of Geomatics Students (NIGS)" },
      { value: "NAFAS", text: "National Association of Fine Art Students (NAFAS)" },
      { value: "NAQSS", text: "National Association of Quantity Survey Students (NAQSS)" }
    ]
    // Add other faculties and associations as needed
  };

  associationDropdown.innerHTML = '<option value="" selected disabled>Select Association</option>';

  if (faculty in associations) {
    associations[faculty].forEach(function(association) {
      var option = document.createElement("option");
      option.value = association.value;
      option.text = association.text;
      associationDropdown.add(option);
    });
  }
}

function populateReviewSection() {
  var reviewSection = document.getElementById("reviewSection");
  reviewSection.innerHTML = ''; // Clear previous content

  var formElements = document.getElementById("signUpForm").elements;

  for (var i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== "button" && formElements[i].type !== "submit") {
      var elementName = formElements[i].name;
      var elementValue = formElements[i].value;

      if (formElements[i].type === "radio" && !formElements[i].checked) {
        continue;
      }

      var elementLabel;
      switch (elementName) {
        case 'school':
          elementLabel = 'School';
          break;
        case 'faculty':
          elementLabel = 'Faculty';
          break;
        case 'department':
          elementLabel = 'Department';
          break;
        case 'association':
          elementLabel = 'Association';
          break;
        case 'level':
          elementLabel = 'Level';
          break;
        case 'entry':
          elementLabel = 'Entry Mode';
          break;
        case 'student-type':
          elementLabel = 'Student Type';
          break;
        case 'payment':
          elementLabel = 'Payment For';
          break;
        case 'first_name':
          elementLabel = 'Firstname';
          break;
        case 'last_name':
          elementLabel = 'Lastname';
          break;
        case 'othername':
          elementLabel = 'Othername';
          break;
        case 'email':
          elementLabel = 'Email';
          break;
        case 'phone':
          elementLabel = 'Phone';
          break;
        case 'mat_number':
          elementLabel = 'Matric No';
          break;
        case 'gender':
          elementLabel = 'Gender';
          break;
        default:
          elementLabel = elementName;
      }

      if (elementValue) {
        var p = document.createElement("p");
        p.innerHTML = `<div id="display"><strong style="margin-right:5px;" >${elementLabel}:</strong> ${elementValue}</div>`;
        reviewSection.appendChild(p);
      }
    }
  }
}


