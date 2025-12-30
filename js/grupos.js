const tbodyGrupos = document.getElementById("tablaGrupos");

let totalGrupos = 0;

gruposData.sedes.forEach(s => {
  totalGrupos += s.grupos;

  tbodyGrupos.innerHTML += `
    <tr>
      <td>${s.sede}</td>
      <td>${s.lugar}</td>
      <td>${s.grupos}</td>
      <td>${s.crec}</td>
      <td>${s.warriors}</td>
      <td>${s.relevo}</td>
      <td>${s.noReportado}</td>
      <td>${s.noRealizado}</td>
    </tr>
  `;
});

document.getElementById("totalGrupos").innerHTML =
  `${totalGrupos}<span>Total Grupos</span>`;
document.getElementById("gruposAbiertos").innerHTML =
  `${gruposData.resumen.abiertos}<span>Abiertos</span>`;
document.getElementById("gruposCerrados").innerHTML =
  `${gruposData.resumen.cerrados}<span>Cerrados</span>`;
document.getElementById("totalSedes").innerHTML =
  `${gruposData.sedes.length}<span>Sedes</span>`;
