const code = "F5L766-TB3A81";
const API_URL = "http://gamf.nhely.hu/ajax2/";

function fetchData() {
    fetch(`${API_URL}?op=read&code=${CODE}`)
        .then(res => res.json())
        .then(data => {
            if (data.list) {
                displayData(data.list);
            }
        });
}

function displayData(data) {
    const output = document.getElementById("adatok");
    output.innerHTML = "";
    let sum = 0, max = 0;

    data.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
        output.appendChild(div);

        const height = parseInt(item.height);
        if (!isNaN(height)) {
            sum += height;
            if (height > max) max = height;
        }
    });

    const avg = data.length ? (sum / data.length).toFixed(2) : 0;
    output.innerHTML += `<p>Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}</p>`;
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
        alert("A magasság érvényes szám legyen!");
        return false;
    }
    return true;
}

function createData() {
    const name = document.getElementById("nev").value;
    const height = document.getElementById("magassag").value;
    const weight = "70";

    if (!validateInput(name, height)) return;

    fetch(`${API_URL}?op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => {
        fetchData();
        showFeedback("Sikeres hozzáadás.");
    });
}

function getDataForId() {
    const id = document.getElementById("modositId").value;

    fetch(`${API_URL}?op=read&code=${CODE}`)
        .then(res => res.json())
        .then(data => {
            const record = data.list.find(item => item.id === id);
            if (record) {
                document.getElementById("modositNev").value = record.name;
                document.getElementById("modositMagassag").value = record.height;
            } else {
                showFeedback("Nem található ilyen ID.");
            }
        });
}

function updateData() {
    const id = document.getElementById("modositId").value;
    const name = document.getElementById("modositNev").value;
    const height = document.getElementById("modositMagassag").value;
    const weight = "70";

    if (!validateInput(name, height)) return;

    fetch(`${API_URL}?op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => {
        fetchData();
        showFeedback("Sikeres módosítás.");
    });
}

function deleteData() {
    const id = document.getElementById("torlesId").value;

    fetch(`${API_URL}?op=delete&id=${id}&code=${CODE}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => {
        fetchData();
        showFeedback("Sikeres törlés.");
    });
}

function showFeedback(message) {
    const v = document.getElementById("visszajelzes");
    v.textContent = message;
    setTimeout(() => v.textContent = "", 3000);
}
