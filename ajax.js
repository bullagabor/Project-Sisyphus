// ajax.js

document.addEventListener("DOMContentLoaded", function () {
    fetchData();

    document.getElementById("letrehozasGomb").addEventListener("click", createData);
    document.getElementById("modositasGomb").addEventListener("click", updateData);
    document.getElementById("adatLekerdezes").addEventListener("click", fetchDataById);
});

const CODE = "TB3A81efg456"; // A felhasználó által megadott kód
const API_URL = "http://gamf.nhely.hu/ajax2/";

function fetchData() {
    fetch(`${API_URL}?op=read&code=${CODE}`)
        .then(response => response.json())
        .then(data => {
            if (data.list) {
                displayData(data.list);
            }
        })
        .catch(error => console.error("Hiba az adatok lekérésekor:", error));
}

function displayData(data) {
    const output = document.getElementById("adatok");
    output.innerHTML = "";
    let totalHeight = 0, maxHeight = 0;
    
    data.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
        output.appendChild(div);
        totalHeight += parseInt(item.height);
        if (parseInt(item.height) > maxHeight) maxHeight = parseInt(item.height);
    });
    
    let avgHeight = data.length ? (totalHeight / data.length).toFixed(2) : 0;
    output.innerHTML += `<p>Összeg: ${totalHeight}, Átlag: ${avgHeight}, Legnagyobb: ${maxHeight}</p>`;
}

function createData() {
    const name = document.getElementById("nev").value;
    const height = document.getElementById("magassag").value;
    const weight = "70"; // Példaérték, opcionálisan bevihető mező
    if (!validateInput(name, height)) return;

    fetch(`${API_URL}?op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`, {
        method: "POST",
    })
    .then(response => response.json())
    .then(() => fetchData())
    .catch(error => console.error("Hiba az adat létrehozásakor:", error));
}

function fetchDataById() {
    const id = document.getElementById("modositId").value;
    if (!id) return alert("ID megadása kötelező!");
    
    fetch(`${API_URL}?op=read&code=${CODE}`)
        .then(response => response.json())
        .then(data => {
            const record = data.list.find(item => item.id === id);
            if (record) {
                document.getElementById("modositNev").value = record.name;
                document.getElementById("modositMagassag").value = record.height;
            } else {
                alert("Nincs ilyen ID!");
            }
        })
        .catch(error => console.error("Hiba az ID lekérésekor:", error));
}

function updateData() {
    const id = document.getElementById("modositId").value;
    const name = document.getElementById("modositNev").value;
    const height = document.getElementById("modositMagassag").value;
    const weight = "70";
    if (!validateInput(name, height)) return;

    fetch(`${API_URL}?op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`, {
        method: "POST",
    })
    .then(response => response.json())
    .then(() => fetchData())
    .catch(error => console.error("Hiba az adat módosításakor:", error));
}

function validateInput(name, height) {
    if (!name || !height) {
        alert("A mezők nem lehetnek üresek!");
        return false;
    }
    if (name.length > 30) {
        alert("A név maximum 30 karakter lehet!");
        return false;
    }
    if (isNaN(height) || height <= 0) {
        alert("A magasság érvényes szám kell legyen!");
        return false;
    }
    return true;
}
