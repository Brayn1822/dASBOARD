const dashboard = document.getElementById("dashboard");

// KPIs
document.getElementById("totalAsistentes").textContent =
  asistenciaData.reduce((s,a)=>s+a.asistentes,0);

document.getElementById("totalAusentes").textContent =
  asistenciaData.reduce((s,a)=>s+a.ausentes,0);

// Agrupar por lugar
const lugares = [...new Set(asistenciaData.map(a=>a.lugar))];

lugares.forEach(lugar=>{
  const lugarDiv = document.createElement("div");
  lugarDiv.className="lugar";
  lugarDiv.innerHTML = `<h2>${lugar}</h2><div class="content"></div>`;

  const contentLugar = lugarDiv.querySelector(".content");

  asistenciaData.filter(a=>a.lugar===lugar).forEach(s=>{
    const sedeDiv = document.createElement("div");
    sedeDiv.className="sede";
    sedeDiv.innerHTML = `
      <h3>
        ${s.sede}
        <span>${s.asistentes}</span>
      </h3>
      <div class="content">
        <div class="tipo">Asistentes <strong>${s.asistentes}</strong></div>
        <div class="tipo">Ausentes <strong>${s.ausentes}</strong></div>
      </div>
    `;

    sedeDiv.querySelector("h3").onclick=e=>{
      e.stopPropagation();
      sedeDiv.querySelector(".content").classList.toggle("active");
    };

    contentLugar.appendChild(sedeDiv);
  });

  lugarDiv.onclick=()=>contentLugar.classList.toggle("active");
  dashboard.appendChild(lugarDiv);
});
