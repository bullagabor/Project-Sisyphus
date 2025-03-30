let employees = [];
let editIndex = -1;

const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
const searchInput = document.getElementById("searchInput");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const salary = document.getElementById("salary").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!name || !email || !salary || !city) return;

  const data = { name, email, salary, city };

  if (editIndex === -1) {
    employees.push(data); // CREATE
  } else {
    employees[editIndex] = data; // UPDATE
    editIndex = -1;
  }

  form.reset();
  renderTable();
});

function renderTable() {
  table.innerHTML = "";

  const filtered = employees.filter(emp =>
    Object.values(emp).some(value =>
      value.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  );

  filtered.forEach((emp, index) => {
    const row = table.insertRow();

    row.insertCell().textContent = emp.name;
    row.insertCell().textContent = emp.email;
    row.insertCell().textContent = emp.salary;
    row.insertCell().textContent = emp.city;

    const actions = row.insertCell();
    actions.innerHTML = `
      <button class="edit" onclick="editEntry(${index})">Szerkeszt</button>
      <button class="delete" onclick="deleteEntry(${index})">Törlés</button>
    `;
  });
}

function editEntry(index) {
  const emp = employees[index];
  document.getElementById("name").value = emp.name;
  document.getElementById("email").value = emp.email;
  document.getElementById("salary").value = emp.salary;
  document.getElementById("city").value = emp.city;
  editIndex = index;
}

function deleteEntry(index) {
  if (confirm("Biztosan törlöd?")) {
    employees.splice(index, 1);
    renderTable();
  }
}

searchInput.addEventListener("input", renderTable);

// Rendezés
document.querySelectorAll("th[data-col]").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.getAttribute("data-col");
    employees.sort((a, b) => a[col].localeCompare(b[col], "hu", { numeric: true }));
    renderTable();
  });
});
