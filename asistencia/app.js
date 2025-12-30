const dashboard = document.getElementById("dashboard");

// Agrupar por lugar
const lugares = [...new Set(asistenciaData.map(d => d.lugar))];

lugares.forEach(lugar => {
  const lugarDiv = document.createElement("div");
  lugarDiv.className = "lugar";
  lugarDiv.innerHTML = `<h2>${lugar}</h2><div class="content"></div>`;

  const contentLugar = lugarDiv.querySelector(".content");

  asistenciaData
    .filter(d => d.lugar === lugar)
    .forEach(s => {

      const totalGrupos =
        s.grupos.crec + s.grupos.warriors + s.grupos.relevo;

      const sedeDiv = document.createElement("div");
      sedeDiv.className = "sede";
      sedeDiv.innerHTML = `
        <h3>
          ${s.sede}
          <span>${totalGrupos} grupos</span>
        </h3>

        <div class="meta">
          🚫 No reportado: ${s.grupos.noReportado} |
          ⛔ No realizado: ${s.grupos.noRealizado}
        </div>

        <div class="content">
          <div class="tipo">👥 Hermanos - Grupo <strong>${s.hermanos.grupo}</strong></div>
          <div class="tipo">👥 Hermanos - Culto <strong>${s.hermanos.culto}</strong></div>
          <div class="tipo">👶 Niños - Grupo <strong>${s.ninos.grupo}</strong></div>
          <div class="tipo">👶 Niños - Culto <strong>${s.ninos.culto}</strong></div>
        </div>
      `;

      sedeDiv.querySelector("h3").onclick = e => {
        e.stopPropagation();
        sedeDiv.querySelector(".content").classList.toggle("active");
      };

      contentLugar.appendChild(sedeDiv);
    });

  lugarDiv.onclick = () => contentLugar.classList.toggle("active");
  dashboard.appendChild(lugarDiv);
});
