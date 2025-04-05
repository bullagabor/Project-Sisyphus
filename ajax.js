const code = "F5L766-TB3A81";

function readData() {
  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    body: new URLSearchParams({ op: "read", code })
  })
    .then(res => res.json())
    .then(data => {
      const list = data.list || [];
      let output = "";
      let sum = 0;
      let max = 0;
      list.forEach(row => {
        output += `ID: ${row.id}, Név: ${row.name}, Magasság: ${row.height}, Súly: ${row.weight}<br>`;
        sum += Number(row.height);
        if (Number(row.height) > max) max = Number(row.height);
      });
      const avg = list.length ? (sum / list.length).toFixed(2) : 0;
      document.getElementById("dataOutput").innerHTML = output;
      document.getElementById("stats").innerText = `Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
    });
}

function createData() {
  const nameInput = document.getElementById("nameCreate");
  const heightInput = document.getElementById("heightCreate");
  const weightInput = document.getElementById("weightCreate");

  const name = nameInput.value.trim();
  const height = heightInput.value.trim();
  const weight = weightInput.value.trim();

  if (!name || !height || !weight || name.length > 30) {
    document.getElementById("createMessage").innerText = "Hibás adat!";
    return;
  }

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    body: new URLSearchParams({ op: "create", name, height, weight, code })
  })
    .then(res => res.text())
    .then(() => {
      document.getElementById("createMessage").innerText = "Sikeres létrehozás!";
      readData();
      nameInput.value = "";
      heightInput.value = "";
      weightInput.value = "";
    })
    .catch(error => {
      document.getElementById("createMessage").innerText = "Hiba történt!";
      console.error("Hiba a létrehozás során:", error);
    });
}

function updateData() {
    const idInput = document.getElementById("updateId");
    const nameInput = document.getElementById("nameUpdate");
    const heightInput = document.getElementById("heightUpdate");
    const weightInput = document.getElementById("weightUpdate");
  
    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const height = heightInput.value.trim();
    const weight = weightInput.value.trim();
  
    if (!id || !name || !height || !weight || name.length > 30) {
      document.getElementById("updateMessage").innerText = "Hibás adat!";
      return;
    }
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: new URLSearchParams({ op: "update", id, name, height, weight, code })
    })
      .then(res => res.text())
      .then(() => {
        document.getElementById("updateMessage").innerText = "Sikeres módosítás!";
        readData();
  
        // ✅ Mezők ürítése
        idInput.value = "";
        nameInput.value = "";
        heightInput.value = "";
        weightInput.value = "";
      });
  }
  

function deleteData() {
  const idInput = document.getElementById("deleteId");
  const id = idInput.value.trim();
  if (!id) return;

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    body: new URLSearchParams({ op: "delete", id, code })
  })
    .then(res => res.text())
    .then(() => {
      document.getElementById("deleteMessage").innerText = "Sikeres törlés!";
      readData();
      idInput.value = "";
    });
}

function getDataById() {
    const id = document.getElementById("updateId").value.trim();
    if (!id) return;
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: new URLSearchParams({ op: "read", code })
    })
      .then(res => res.json())
      .then(data => {
        const record = data.list.find(item => item.id == id); // Itt a javítás!
        if (record) {
          document.getElementById("nameUpdate").value = record.name;
          document.getElementById("heightUpdate").value = record.height;
          document.getElementById("weightUpdate").value = record.weight;
          document.getElementById("updateMessage").innerText = "";
        } else {
          document.getElementById("updateMessage").innerText = "Nem található ilyen ID!";
        }
      });
  }
  

// automatikusan betöltés induláskor
window.onload = readData;
