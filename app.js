const dashboard = document.getElementById("dashboard");

// KPIs
const totalGrupos = gruposData.reduce((s,g)=> s + g.crec + g.warriors + g.relevo, 0);
const totalSedes = new Set(gruposData.map(g=>g.sede)).size;
const gruposAbiertos = totalGrupos; // puedes ajustar lógica real
const gruposCerrados = 0;

document.getElementById("totalGrupos").textContent = totalGrupos;
document.getElementById("gruposAbiertos").textContent = gruposAbiertos;
document.getElementById("gruposCerrados").textContent = gruposCerrados;
document.getElementById("totalSedes").textContent = totalSedes;

// Render Lugares
const lugares = [...new Set(gruposData.map(g=>g.lugar))];

lugares.forEach(lugar=>{
  const lugarDiv = document.createElement("div");
  lugarDiv.className="lugar";
  lugarDiv.innerHTML=`<h2>${lugar} <span>▼</span></h2><div class="content"></div>`;

  const content = lugarDiv.querySelector(".content");

  const sedes = gruposData.filter(g=>g.lugar===lugar);

  sedes.forEach(s=>{
    const sedeDiv = document.createElement("div");
    sedeDiv.className="sede";
    sedeDiv.innerHTML=`
      <h3>${s.sede} <span>▶</span></h3>
      <div class="content">
        <div class="tipo"><span>CREC</span><strong>${s.crec}</strong></div>
        <div class="tipo"><span>WARRIORS</span><strong>${s.warriors}</strong></div>
        <div class="tipo"><span>RELEVO</span><strong>${s.relevo}</strong></div>
      </div>
    `;

    sedeDiv.querySelector("h3").onclick = e=>{
      e.stopPropagation();
      sedeDiv.querySelector(".content").classList.toggle("active");
    };

    content.appendChild(sedeDiv);
  });

  lugarDiv.onclick = ()=> content.classList.toggle("active");

  dashboard.appendChild(lugarDiv);
});
