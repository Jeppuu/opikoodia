var mode = 0;

window.onload = function () {
  createForm();
  getContactList();
}

createForm = () => {
  let root = document.querySelector('#root');
  let form = document.createElement("form");
  form.setAttribute("class", "m-3");

  //create fist name input and label
  let firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.setAttribute("id", "firstname");
  firstNameInput.setAttribute("name", "firstname");
  firstNameInput.setAttribute("class", "form-control");

  let firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "firstname");
  firstNameLabel.setAttribute("class", "form-label");

  let firstNameText = document.createTextNode("First Name");
  firstNameLabel.appendChild(firstNameText);

  //create last name input and label
  let lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("type", "text");
  lastNameInput.setAttribute("id", "lastname");
  lastNameInput.setAttribute("name", "lastname");
  lastNameInput.setAttribute("class", "form-control");

  let lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "lastname");
  lastNameLabel.setAttribute("class", "form-label");

  let lastNameText = document.createTextNode("Last Name");
  lastNameLabel.appendChild(lastNameText);

  //create email input and label
  let emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("class", "form-control");

  let emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.setAttribute("class", "form-label");

  let emailText = document.createTextNode("Email");
  emailLabel.appendChild(emailText);

  //create phone input and label
  let phoneInput = document.createElement("input");
  phoneInput.setAttribute("type", "tel");
  phoneInput.setAttribute("id", "phone");
  phoneInput.setAttribute("name", "phone");
  phoneInput.setAttribute("class", "form-control");

  let phoneLabel = document.createElement("label");
  phoneLabel.setAttribute("for", "phone");
  phoneLabel.setAttribute("class", "form-label");

  let phoneText = document.createTextNode("Phone");
  phoneLabel.appendChild(phoneText);

  //create submit button
  let submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submitbutton");
  submitButton.setAttribute("class", "btn btn-success mt-3 w-100");
  submitButton.setAttribute("value", "Add");

  //Append all the elements to form
  //use form.append(every element) for inline function
  form.appendChild(firstNameLabel);
  form.appendChild(firstNameInput);
  form.appendChild(lastNameLabel);
  form.appendChild(lastNameInput);
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(phoneLabel);
  form.appendChild(phoneInput);
  form.appendChild(submitButton);

  //prevent default form action after submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addContact();
  })
  //append form to root
  root.appendChild(form)

  //send contact from form to server
  addContact = async () => {
    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    let contact = {
      "firstname": firstname.value,
      "lastname": lastname.value,
      "email": email.value,
      "phone": phone.value
    }
    let url = "/api/contact";
    let request = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    }
    //if in edit mode
    if (mode) {
      url = "/api/contact/" + mode;
      request = {
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(contact)
      }
    }
    const response = await fetch(url, request);
    if (response.ok) {
      firstname.value = "";
      lastname.value = "";
      email.value = "";
      phone.value = "";
      mode = 0;
      const submitButton = document.querySelector("#submitbutton");
      submitButton.value = "Add";
      getContactList();
    } else {
      console.log("Server responded with a status " + response.status + " " + response.statusText);
    }
  }

  getContactList = async () => {
    const response = await fetch("/api/contact");
    if (response.ok) {
      let list = await response.json();
      if (list) {
        populateTable(list);
      }
    } else {
      console.log("Server responded with a status " + response.status + " " + response.statusText);
    }
  }

  removeContact = async (id) => {
    let request = {
      "method": "DELETE",
    }
    const response = await fetch("/api/contact/" + id, request);
    if (response.ok) {
      getContactList();
    } else {
      console.log("Server responded with a status of " + response.status + " " + response.statusText);
    }
  }

  editContact = (contact) => {
    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    firstname.value = contact.firstname;
    lastname.value = contact.lastname;
    email.value = contact.email;
    phone.value = contact.phone;

    mode = contact._id;
    const submitButton = document.querySelector("#submitbutton");
    submitButton.value = "Save";
  }


  //fill table with elements
  populateTable = (list) => {
    const root = document.querySelector("#root");
    //if there already is a table
    const oldTable = document.querySelector("#table");
    if (oldTable) {
      root.removeChild(oldTable);
    }
    const table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("class", "table table-striped");

    //table headers

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");

    //first name
    const firstNameHeader = document.createElement("th");
    const firstNameText = document.createTextNode("First Name");
    firstNameHeader.appendChild(firstNameText);

    //last name
    const lastNameHeader = document.createElement("th");
    const lastNameText = document.createTextNode("Last Name");
    lastNameHeader.appendChild(lastNameText);

    //email
    const emailHeader = document.createElement("th");
    const emailText = document.createTextNode("Email");
    emailHeader.appendChild(emailText);

    //phone
    const phoneHeader = document.createElement("th");
    const phoneText = document.createTextNode("Phone");
    phoneHeader.appendChild(phoneText);

    //remove
    const removeHeader = document.createElement("th");
    const removeText = document.createTextNode("Remove");
    removeHeader.appendChild(removeText);

    //edit
    const editHeader = document.createElement("th");
    const editText = document.createTextNode("Edit");
    editHeader.appendChild(editText);

    //append elements to header row
    //and header row to header
    //last append table into header
    headerRow.append(firstNameHeader, lastNameHeader, emailHeader, phoneHeader, removeHeader, editHeader);
    header.appendChild(headerRow);
    table.appendChild(header);

    //create table body

    const body = document.createElement("tbody");
    //loop through the list and the list objects
    for (let i = 0; i < list.length; i++) {
      const tableRow = document.createElement("tr");
      for (x in list[i]) {
        if (x === "_id" || x === "__v") {
          continue;
        }
        const column = document.createElement("td");
        const info = document.createTextNode(list[i][x]);
        column.appendChild(info);
        tableRow.append(column);
      }
      const removeColumn = document.createElement("td");
      const removeButton = document.createElement("button");
      removeButton.setAttribute("class", "btn btn-danger");
      const removeButtonText = document.createTextNode("Remove");
      removeButton.appendChild(removeButtonText);
      removeButton.addEventListener("click", function (e) {
        removeContact(list[i]._id);
      })

      const editColumn = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.setAttribute("class", "btn btn-secondary");
      const editButtonText = document.createTextNode("Edit");
      editButton.appendChild(editButtonText);
      editButton.addEventListener("click", function (e) {
        editContact(list[i]);
      })
      //append buttons into columns
      removeColumn.appendChild(removeButton);
      editColumn.appendChild(editButton);
      //append columns into row
      tableRow.append(removeColumn, editColumn);
      //append row into body
      body.appendChild(tableRow);

    }
    //append body into table
    table.appendChild(body);
    //append table into root
    root.appendChild(table);
  }


}