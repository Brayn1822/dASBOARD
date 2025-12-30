const thead = document.getElementById("theadAsistencia");
const tbody = document.getElementById("tbodyAsistencia");

function mostrarAsistencia(tipo) {
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

  tbody.innerHTML = "";

  asistenciaData.forEach(s => {
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

mostrarAsistencia("hermanos");
