class Auto {
  constructor(marka, tipus, evjarat) {
    this.marka = marka;
    this.tipus = tipus;
    this.evjarat = evjarat;
  }

  kiir() {
    return `${this.evjarat} ${this.marka} ${this.tipus}`;
  }

  megjelenit() {
    const div = document.createElement("div");
    div.textContent = this.kiir();
    document.getElementById("carContainer").appendChild(div);
  }
}

document.getElementById("autoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const marka = document.getElementById("marka").value;
  const tipus = document.getElementById("tipus").value;
  const evjarat = document.getElementById("evjarat").value;

  const auto = new Auto(marka, tipus, evjarat);
  auto.megjelenit();

  e.target.reset(); // mezők ürítése
});