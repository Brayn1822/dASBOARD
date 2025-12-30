const dashboard = document.getElementById("dashboard");
const lugares = agruparPorLugar(asistenciaData);

// KPIs
document.getElementById("totalAsistentes").textContent =
  asistenciaData.reduce((s,a)=>s+a.hermanos.asistentes+a.ninos.asistentes,0);

Object.entries(lugares).forEach(([lugar, sedes])=>{
  const lugarDiv = document.createElement("div");
  lugarDiv.className = "lugar";
  lugarDiv.innerHTML = `<h2>${lugar}</h2><div class="content"></div>`;

  const contentLugar = lugarDiv.querySelector(".content");

  sedes.forEach(s=>{
    const sedeDiv = document.createElement("div");
    sedeDiv.className = "sede";
    sedeDiv.innerHTML = `
      <h3>${s.sede}</h3>
      <div class="content">
        <div class="tipo">
          👨 Hermanos: ${s.hermanos.asistentes}
          | Nuevos ${s.hermanos.nuevos}
          | Conv. ${s.hermanos.conversiones}
        </div>
        <div class="tipo">
          🧒 Niños: ${s.ninos.asistentes}
          | Nuevos ${s.ninos.nuevos}
          | Conv. ${s.ninos.conversiones}
        </div>
      </div>
    `;

    sedeDiv.querySelector("h3").onclick = e=>{
      e.stopPropagation();
      sedeDiv.querySelector(".content").classList.toggle("active");
    };

    contentLugar.appendChild(sedeDiv);
  });

  lugarDiv.onclick = ()=>contentLugar.classList.toggle("active");
  dashboard.appendChild(lugarDiv);
});
