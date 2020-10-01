// variables for form submission
const form = document.getElementsByTagName("form")[0];
const email = document.getElementById("mail");
const activity = document.querySelector(".activities");

// Autofocus in the name input when we refresh the page.
let name = document.getElementById("name");
name.focus();

// initially hide the "other" input for job roles
const otherJob = document.getElementById("other-title");
const jobTitle = document.getElementById("title");

otherJob.style.display = "none";

// show other text input if "other" option is selected
jobTitle.addEventListener("change", function (e) {
  if (e.target.value === "other") {
    otherJob.style.display = "block";
  } else {
    otherJob.style.display = "none";
  }
});

// T-SHIRT SECTION

// Get the select element with ID "design"
const selectDesign = document.getElementById("design");
// Add text to the select dropdown menu
selectDesign.firstElementChild.textContent = "Please Select a Theme";
// Get the select element with the ID "color"and  the parent div with the ID "shirt-colors" to target the label element
// Hide the label and the select elements
const selectColor = document.getElementById("color");
const shirtColorDiv = document.getElementById("shirt-colors");

selectColor.style.display = "none";
shirtColorDiv.firstElementChild.style.display = "none";

// Add event listener with "change" event on the "design" select element
selectDesign.addEventListener("change", (e) => {
  // Show the "color" select menu and it's label
  selectColor.style.display = "block";
  shirtColorDiv.firstElementChild.style.display = "block";
  // Declare which option the user picked from the design
  let changed = e.target;
  if (changed.value === "js puns") {
    // select the last 3 elements and hide them
    for (let i = 3; i < 6; i++) {
      selectColor.children[i].style.display = "none";
    }
    // select the first 3 elements and show them
    for (let j = 0; j < 3; j++) {
      selectColor.children[j].style.display = "block";
    }
    // reset the menu to show the first option in this group of choices
    selectColor.children[0].selected = true;
  } else if (changed.value === "heart js") {
    // select the first 3 elements and hide them
    for (let i = 0; i < 3; i++) {
      selectColor.children[i].style.display = "none";
    }
    // select the last 3 elements and show them
    for (let j = 3; j < 6; j++) {
      selectColor.children[j].style.display = "block";
    }
    // set the menu to show the first option in this group of choices
    selectColor.children[3].selected = true;
  }
});

//ACTIVITY SECTION
//creating a div to the bottom of activity section to append the total cost
const costElement = document.createElement("div");
let totalCost = 0;
activity.appendChild(costElement);

/*Creating an event-listener so when i click on a checkbox the total cost updates and 
the other checkboxes with the same date and time turns grey and disabled*/

activity.addEventListener("change", function (e) {
  let check = e.target;
  let cost = check.getAttribute("data-cost");
  let dayAndTime = check.getAttribute("data-day-and-time");
  let activityCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  //making the cost an integer number
  cost = parseInt(cost);

  if (check.checked === true) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }
  costElement.textContent = `Total Price is: $${totalCost}`;

  // Loop through all the input elements
  for (let i = 0; i < activityCheckboxes.length; i++) {
    // variable to assign the current loop element's data-day-and-time
    let inputAttrubute = activityCheckboxes[i].getAttribute(
      "data-day-and-time"
    );

    /* If date and time is the same for checked and another checkbox
   and their name is not the same I enable and disable the checkbox appropriate */
    if (dayAndTime === inputAttrubute && check !== activityCheckboxes[i]) {
      if (activityCheckboxes[i].disabled) {
        activityCheckboxes[i].disabled = false;
        activityCheckboxes[i].parentNode.style.color = "black";
      } else {
        activityCheckboxes[i].disabled = true;
        activityCheckboxes[i].parentNode.style.color = "grey";
      }
    }
  }
});

//PAYMENT SECTION

//Variable declaration for the payment section
const payment = document.getElementById("payment");
const cc = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//Setting the credit card as the default value of payment
for (let i = 0; i < payment.length; i++) {
  let option = payment.children[i];
  if (option.value === "credit card") {
    option.setAttribute("selected", true);
  }
}
//Disabling the select payment method option
document.querySelector("[value='select method']").disabled = true;

//Hiding the paypal and bitcoin information but not the credit card option
cc.style.display = "";
paypal.style.display = "none";
bitcoin.style.display = "none";

//Event listener when i change the option of payment method
//Creating a function where show and hide the payment information when the appropriate method is picked
payment.addEventListener("change", (e) => {
  const paymentType = e.target.value;
  if (paymentType === "credit card") {
    cc.style.display = "";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentType === "paypal") {
    paypal.style.display = "";
    cc.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentType === "bitcoin") {
    bitcoin.style.display = "";
    cc.style.display = "none";
    paypal.style.display = "none";
  }
});

//Form validation

/* Function to validate name input */
const nameError = errorMessage();
name.previousElementSibling.append(nameError);

const nameValidator = () => {
  const nameValue = name.value;

  if (nameValue.length > 0) {
    name.style.borderColor = "white";
    nameError.style.display = "none";
    return true;
  } else {
    name.style.borderColor = "red";
    nameError.innerText = `   Please enter your name!`;
    nameError.style.display = "";
    return false;
  }
};

/* Function to validate email input */
const emailError = errorMessage();
email.previousElementSibling.append(emailError);

const emailValidator = () => {
  const emailValue = email.value;
  const at = emailValue.indexOf("@");
  const dot = emailValue.lastIndexOf(".");

  if (at > 1 && dot > at + 1) {
    email.style.borderColor = "white";
    emailError.style.display = "none";
    return true;
  } else {
    email.style.borderColor = "red";
    emailError.innerText = `   Please enter your email!`;
    emailError.style.display = "";
    return false;
  }
};

/* Function to validate activities section */
const activityError = errorMessage();
activity.insertBefore(activityError, activity.firstChild);

const activityValidator = () => {
  const isChecked = document.querySelectorAll("[type=checkbox]:checked");
  if (isChecked.length === 0) {
    activity.style.borderColor = "red";
    activityError.innerText = `   Please select at least one activity!`;
    activityError.style.display = "";
    return false;
  } else {
    activity.style.borderColor = "white";
    activityError.style.display = "none";
    return true;
  }
};

//Variable declaration for the payment section
const ccNum = document.getElementById("cc-num");
const zipNum = document.getElementById("zip");
const cvvNum = document.getElementById("cvv");

//Creating error messages for all the payment methods
const ccError = errorMessage();
const zipError = errorMessage();
const cvvError = errorMessage();

//Appending the error messages to their labels
ccNum.previousElementSibling.append(ccError);
zipNum.previousElementSibling.append(zipError);
cvvNum.previousElementSibling.append(cvvError);

//Function to validate payment section

const paymentValidator = () => {
  //regular expression for credit card number
  let regex = /^\d{13}\d?\d?\d?$/;
  let bool = regex.test(ccNum.value);
  let ccBool;
  if (bool) {
    ccBool = true;
    ccNum.style.borderColor = "white";
    ccError.style.display = "none";
  } else {
    ccNum.style.borderColor = "red";
    ccError.innerText = `   Please enter a valid credit card number!`;
    ccError.style.display = "";
    ccBool = false;
  }
  //regular expression for Zip number
  regex = /^\d{5}$/;
  bool = regex.test(zipNum.value);
  let zipBool;
  if (bool) {
    zipBool = true;
    zipNum.style.borderColor = "white";
    zipError.style.display = "none";
  } else {
    zipNum.style.borderColor = "red";
    zipError.innerText = `   Please enter a valid Zip!`;
    zipError.style.display = "";
    zipBool = false;
  }
  //regular expression for CVV number
  regex = /^\d{3}$/;
  bool = regex.test(cvvNum.value);
  let cvvBool;
  if (bool) {
    cvvBool = true;
    cvvNum.style.borderColor = "white";
    cvvError.style.display = "none";
  } else {
    cvvNum.style.borderColor = "red";
    cvvError.innerText = `   Please enter a valid CVV!`;
    cvvError.style.display = "";
    cvvBool = false;
  }

  //If all the fields have correct values we send a true value to the paymentvalidator
  if (ccBool === true && zipBool === true && cvvBool === true) {
    return true;
  } else {
    return false;
  }
};

//Function for creating error message
function errorMessage() {
  const error = document.createElement("span");
  error.className = "errormsg";
  error.style.color = "rgb(190, 3, 3)";
  error.style.display = "none";
  return error;
}

/* Submit listener on the form element */
form.addEventListener("submit", (e) => {
  if (!nameValidator()) {
    e.preventDefault();
  }
  if (!emailValidator()) {
    e.preventDefault();
  }
  if (!activityValidator()) {
    e.preventDefault();
  }
  if (payment.value === "credit card") {
    if (!paymentValidator()) {
      e.preventDefault();
    }
  }
});
