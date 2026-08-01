/*
1.Variables
2. Functions
3. Loops
4. Conditional Statements
5. Event handlers
6. DOM
7. Pop Ups
*/

//What is a keyword? Fixed Word in that language that you cannot use for anything else apart from the job it was selected to do.

//DATA TYPES - int, float, string, bool, char
//let , var, const - scope, reassignment



// ==================================================
// CHANGED: GOOGLE APPS SCRIPT URL
// ==================================================
// We are replacing localStorage with Google Sheets.
//
// The flow is:
//
// JavaScript
//      ↓
// fetch()
//      ↓
// Google Apps Script
//      ↓
// Google Sheet
//
// Paste your deployed Google Apps Script Web App URL here.

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxMXxB8N_z_IGlxxoFY11YIqeKMxXbVUePYU9p-0BBF5w-jNvnvE8kVHDNi8vXukRxrLA/exec";

//FUNCTIONS - V.Imp - Building blocks of coding.

//Function definition

//Function CALL


// function greet_person(name){ // function definition
//   alert("Hi, welcome to my webpage "+name);
// }

//Example of a function call with an ARGUMENT
// greet_person("Riya");

//3 POP Ups.
//1. Alert
//2. Confirm
//3. Prompt

// let user_response = "";

// user_response = prompt("this is an alerrt POP UP.");

// console.log(user_response);

//Conditional Statement
// let age = 16;

// if (age>21){
//   alert("You are free to go in.");
// }

// else if(age>18){
//   alert("Entry granted only with a Guardian!");
// }

// else{
//   alert("Entry Denied!");
// }





/*Tasks - JavaScript

1. Making the Toggle Theme button work.
2. Making admin login button work.
3. Make the admin login section work. Check the creds and give/restrict access to User Messages.
4. Make Contact me section work - store the user response in your Database.
5. Display user messages in the User-Responses section.
   */

//Task 2 - Making admin login button work

let control_of_admin_section = document.getElementById("al");

function ShowAdminLogin(){

control_of_admin_section.style.display = "block";

}

//Task 3 - Making the admin section work.
//1. Get the control of the form - because we have to put a SUBMIT event on it.
//2. Get the data which is written on the username and password fields.
//3. set the submit button as type "submit" so that your listener will be able to catch. it.

let control_of_admin_form = document.getElementById("al-form");

let control_of_user_responses_section =
document.getElementById("um");

control_of_admin_form.addEventListener(
"submit",
async function(event){


// ==================================================
// CHANGED: PREVENT PAGE RELOAD
// ==================================================
// By default, submitting an HTML form reloads the page.
// We prevent that because we want JavaScript to handle
// the login request.

event.preventDefault();


let username =
  document.getElementById("input-username").value;


let password =
  document.getElementById("input-password").value;


// ==================================================
// CHANGED: LOGIN IS NOW SENT TO GOOGLE APPS SCRIPT
// ==================================================
// Previously, the username and password were checked
// directly inside this JavaScript file.
//
// Now JavaScript sends the login information to the
// Google Apps Script backend using fetch().
//
// The backend then checks the credentials and sends
// a response back to us.


try {

  let response = await fetch(
    GOOGLE_SCRIPT_URL,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify({

        action: "login",

        username: username,

        password: password

      })

    }
  );


  let result = await response.json();


  if (result.success) {

    alert("Access granted!");

    control_of_admin_section.style.display =
      "none";


    control_of_user_responses_section.style.display =
      "block";


    get_messages();

  }

  else {

    alert("Access Denied!");

  }


}

catch(error) {

  console.error(error);

  alert(
    "Something went wrong while logging in."
  );

}


}

);

//Task - Make Toggle theme button work

let control_of_toggleBtn =
document.getElementById("toggle-theme");

control_of_toggleBtn.addEventListener(
"click",
function(){


document.body.classList.toggle("dark-theme");


}

);

//Task - Make the contact form work.

let control_of_contact_form =
document.getElementById("contact-form");

// ==================================================
// CHANGED: CONTACT FORM NOW SAVES TO GOOGLE SHEETS
// ==================================================
// Previously:
//
// localStorage
//      ↓
// Browser-specific storage
//
// Now:
//
// JavaScript
//      ↓
// fetch()
//      ↓
// Google Apps Script
//      ↓
// Google Sheet
//
// This means messages submitted by different users
// and different computers can all go into the same
// Google Sheet.

control_of_contact_form.addEventListener(
"submit",
async function(event){


// ==================================================
// CHANGED: PREVENT PAGE RELOAD
// ==================================================

event.preventDefault();


let name =
  document.getElementById("name").value;


let email =
  document.getElementById("email").value;


let msg =
  document.getElementById("message").value;


try {


  // ==================================================
  // CHANGED: SEND DATA TO GOOGLE APPS SCRIPT
  // ==================================================

  let response = await fetch(

    GOOGLE_SCRIPT_URL,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "text/plain;charset=utf-8"

      },

      body: JSON.stringify({

        // This tells the backend what operation
        // we want it to perform.

        action: "save_message",

        name: name,

        email: email,

        msg: msg

      })

    }

  );


  let result =
    await response.json();


  if (result.success) {


    alert(
      "Message Submitted"
    );


    // ==================================================
    // CHANGED: CLEAR THE FORM AFTER SUCCESS
    // ==================================================

    control_of_contact_form.reset();


  }

  else {

    alert(
      "Message could not be saved."
    );

  }


}

catch(error) {


  console.error(error);


  alert(
    "Something went wrong while submitting the message."
  );


}


}

);

//Function to get messages

async function get_messages(){

// ==================================================
// CHANGED: FETCH MESSAGES FROM GOOGLE SHEETS
// ==================================================
//
// Previously:
//
// let dummy_database =
//   JSON.parse(localStorage.getItem('tempDB')) || [];
//
//
// Now:
//
// JavaScript sends a GET request to the Google
// Apps Script Web App.
//
// The Google Apps Script reads the Google Sheet
// and returns the rows as JSON.

try {


let response =
  await fetch(
    GOOGLE_SCRIPT_URL
  );


let result =
  await response.json();


if (!result.success) {

  alert(
    "Could not fetch messages."
  );

  return;

}


let control_of_user_responses_div =
  document.getElementById(
    "user-responses"
  );


// ==================================================
// CHANGED: CLEAR OLD DISPLAYED MESSAGES
// ==================================================
// If the admin logs in more than once or calls
// get_messages() again, this prevents duplicate
// messages from being displayed.

control_of_user_responses_div.innerHTML =
  "";


// ==================================================
// CHANGED: READ THE MESSAGES RETURNED BY THE API
// ==================================================

result.messages.forEach(
  responses => {


    let control_of_new_div =
      document.createElement(
        'div'
      );


    // ==================================================
    // CHANGED: USE textContent FOR USER DATA
    // ==================================================
    // Instead of directly placing user input into
    // innerHTML, we create separate elements.
    //
    // This is safer when displaying data submitted
    // by users.

    let nameParagraph =
      document.createElement(
        "p"
      );

    nameParagraph.textContent =
      "Name: " + responses.name;


    let emailParagraph =
      document.createElement(
        "p"
      );

    emailParagraph.textContent =
      "Email: " + responses.email;


    let messageParagraph =
      document.createElement(
        "p"
      );

    messageParagraph.textContent =
      "Message: " + responses.msg;


    let dateParagraph =
      document.createElement(
        "p"
      );

    dateParagraph.textContent =
      "Date: " + responses.date;


    let separator =
      document.createElement(
        "hr"
      );


    control_of_new_div.appendChild(
      nameParagraph
    );


    control_of_new_div.appendChild(
      emailParagraph
    );


    control_of_new_div.appendChild(
      messageParagraph
    );


    control_of_new_div.appendChild(
      dateParagraph
    );


    control_of_new_div.appendChild(
      separator
    );


    control_of_user_responses_div.appendChild(
      control_of_new_div
    );


  }

);


}

catch(error) {


console.error(error);


alert(
  "Something went wrong while fetching messages."
);


}

}
