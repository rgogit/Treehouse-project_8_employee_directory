  // project 8 employee directory //

  // Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

  //fetch url api
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

  // create card
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
  let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let picture = employee.picture;
  employeeHTML += `
  <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.medium}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
  </div>`
  });
  gridContainer.innerHTML = employeeHTML;
}

  // create modal
function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
  <div class="controls">
    <button class="langle">&lang;</button>
    <button class="rangle">&rang;</button>
  </div> 
  <img class="avatar2" src="${picture.large}" />
  <div class="text-container2">
    <h2>${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>`;  
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  return index;
}

  //open modal window
gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
  const card = e.target.closest(".card");
  const index = parseInt(card.getAttribute('data-index'));
  displayModal(index);
  navigation(index);
  }
});

  //close modal window
modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});
  
  // Modal Navigation
const navigation = index => {
  const employeeModelCard = document.querySelector('.modal-content');
  employeeModelCard.addEventListener('click', (e) => {
    if (e.target.className == "rangle") {
      if (index < employees.length - 1) {
        index++;
        displayModal(index);
      } else {
        index = 0;
        displayModal(index);
      }
    }
    if (e.target.className == "langle") {
      if (index > 0) {
        index--;
        displayModal(index);
      } else {
        index = employees.length - 1;
        displayModal(index);
      }
    }
  });
};

  // Search Employees
const searchBar = document.querySelector(".searchTerm");
searchBar.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let employeeName = document.querySelectorAll(".name");
  for (let i = 0; i < employeeName.length; i++) {
    const searchInput = employeeName[i].textContent;
    if (searchInput.toLowerCase().includes(searchTerm)) {
      employeeName[i].parentNode.parentNode.style.display = "";
    } else {
      employeeName[i].parentNode.parentNode.style.display = "none";
    }
  }
});




