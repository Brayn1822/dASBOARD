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

  const filtrados = data.filter(d =>
    (mes === "todos" || d.mes === mes) &&
    d.anio === anio
  );

  renderCards(filtrados);
  renderDetalles(filtrados);
}

function renderCards(datos) {
  const tipos = ["AUDITORIO PRINCIPAL", "SEDES BOGOTÁ", "SEDES NACIONALES"];

  tipos.forEach(tipo => {
    const items = datos.filter(d => d.tipo === tipo);
    pintarCard(tipo, items);
  });

  pintarCard("TOTAL", datos);
}

function pintarCard(tipo, items) {
  const total = sumar(items);
  const abiertos = sumar(items.filter(i => i.estado === "abierto"));
  const cerrados = sumar(items.filter(i => i.estado === "cerrado"));

  const card = document.querySelector(`[data-card="${tipo}"]`);

  card.innerHTML = `
    <h3>${tipo === "TOTAL" ? "Total General" : tipo}</h3>
    <p class="total">${total}</p>
    <small>Abiertos: ${abiertos} | Cerrados: ${cerrados}</small>
  `;
}

function renderDetalles(datos) {
  const contenedor = document.querySelector(".details");
  contenedor.innerHTML = "";

  const agrupado = {};

  datos.forEach(d => {
    if (!agrupado[d.tipo]) agrupado[d.tipo] = [];
    agrupado[d.tipo].push(d);
  });

  Object.keys(agrupado).forEach(tipo => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = tipo;

    const ul = document.createElement("ul");

    agrupado[tipo].forEach(d => {
      const li = document.createElement("li");
      li.textContent = `${d.sede} — ${d.cantidad} grupos`;
      ul.appendChild(li);
    });

    details.appendChild(summary);
    details.appendChild(ul);
    contenedor.appendChild(details);
  });
}

function sumar(arr) {
  return arr.reduce((acc, el) => acc + el.cantidad, 0);
}
