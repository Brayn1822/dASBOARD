let data = [];

const mesSelect = document.getElementById("mes");
const anioSelect = document.getElementById("anio");

fetch("data/grupos.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderDashboard();
  });

mesSelect.addEventListener("change", renderDashboard);
anioSelect.addEventListener("change", renderDashboard);

function renderDashboard() {
  const mes = mesSelect.value;
  const anio = Number(anioSelect.value);

  const filtrados = data.filter(item =>
    (mes === "todos" || item.mes === mes) &&
    item.anio === anio
  );

  renderCards(filtrados);
  renderDetalles(filtrados);
}

function renderCards(datos) {
  const tipos = ["AUDITORIO PRINCIPAL", "SEDES BOGOTÁ", "SEDES NACIONALES"];

  tipos.forEach(tipo => {
    const items = datos.filter(d => d.tipo === tipo);

    const total = sum(items);
    const abiertos = sum(items.filter(i => i.estado === "abierto"));
    const cerrados = sum(items.filter(i => i.estado === "cerrado"));

    document.querySelector(`[data-card="${tipo}"]`).innerHTML = `
      <h3>${tipo}</h3>
      <p class="total">${total}</p>
      <small>Abiertos: ${abiertos} | Cerrados: ${cerrados}</small>
    `;
  });

  // TOTAL GENERAL
  const total = sum(datos);
  const abiertos = sum(datos.filter(i => i.estado === "abierto"));
  const cerrados = sum(datos.filter(i => i.estado === "cerrado"));

  document.querySelector(`[data-card="TOTAL"]`).innerHTML = `
    <h3>Total General</h3>
    <p class="total">${total}</p>
    <small>Abiertos: ${abiertos} | Cerrados: ${cerrados}</small>
  `;
}

function renderDetalles(datos) {
  const contenedor = document.querySelector(".details");
  contenedor.innerHTML = "";

  const agrupado = {};

  datos.forEach(item => {
    if (!agrupado[item.tipo]) agrupado[item.tipo] = [];
    agrupado[item.tipo].push(item);
  });

  Object.keys(agrupado).forEach(tipo => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = tipo;

    const ul = document.createElement("ul");

    agrupado[tipo].forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.sede} — ${item.cantidad} grupos`;
      ul.appendChild(li);
    });

    details.appendChild(summary);
    details.appendChild(ul);
    contenedor.appendChild(details);
  });
}

function sum(arr) {
  return arr.reduce((acc, el) => acc + el.cantidad, 0);
}
