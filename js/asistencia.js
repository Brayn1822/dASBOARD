const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

function calcularTotales() {
  let totalHermanos = 0;
  let totalNinos = 0;
  let totalGrupos = 0;

  asistencia.forEach(s => {
    totalHermanos += s.hermanos.total;
    totalNinos += s.ninos.total;
    totalGrupos += s.grupos;
  });

  document.getElementById("totalHermanos").innerHTML = `${totalHermanos}<span>Hermanos</span>`;
  document.getElementById("totalNinos").innerHTML = `${totalNinos}<span>Niños</span>`;
  document.getElementById("totalGrupos").innerHTML = `${totalGrupos}<span>Grupos</span>`;
  document.getElementById("totalSedes").innerHTML = `${asistencia.length}<span>Sedes</span>`;
}

function mostrarTabla(tipo) {
  thead.innerHTML = "";
  tbody.innerHTML = "";

  thead.innerHTML = `
    <tr>
      <th>Sede</th>
      <th>Total</th>
      <th>Nuevos</th>
      <th>Conversiones</th>
      <th>Grupo</th>
      <th>Culto</th>
    </tr>
  `;

  asistencia.forEach(s => {
    const d = s[tipo];
    tbody.innerHTML += `
      <tr>
        <td>${s.sede}</td>
        <td>${d.total}</td>
        <td>${d.nuevos}</td>
        <td>${d.conversiones}</td>
        <td>${d.grupo}</td>
        <td>${d.culto}</td>
      </tr>
    `;
  });
}

calcularTotales();
mostrarTabla("hermanos");
