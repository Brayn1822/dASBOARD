/***************
 * TABS
 ***************/
const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");
const kpisGrupos = document.getElementById("kpisGrupos");

tabs.forEach(tab=>{
  tab.onclick = ()=>{
    tabs.forEach(t=>t.classList.remove("active"));
    views.forEach(v=>v.classList.remove("active"));

    tab.classList.add("active");
    document
      .getElementById(`view-${tab.dataset.view}`)
      .classList.add("active");

    // KPIs solo visibles en Grupos
    kpisGrupos.style.display =
      tab.dataset.view === "grupos" ? "grid" : "none";
  };
});

/***************
 * DASHBOARD GRUPOS (TU CÓDIGO ORIGINAL)
 ***************/
const dashboard = document.getElementById("dashboard");

// KPIs
const totalGrupos = gruposData.reduce(
  (s,g)=> s + g.crec + g.warriors + g.relevo, 0
);

document.getElementById("totalGrupos").textContent = totalGrupos;
document.getElementById("totalSedes").textContent =
  new Set(gruposData.map(g=>g.sede)).size;

// Agrupar por lugar
const lugares = [...new Set(gruposData.map(g=>g.lugar))];

lugares.forEach(lugar=>{
  const lugarDiv = document.createElement("div");
  lugarDiv.className="lugar";
  lugarDiv.innerHTML = `<h2>${lugar}</h2><div class="content"></div>`;

  const contentLugar = lugarDiv.querySelector(".content");

  gruposData.filter(g=>g.lugar === lugar).forEach(s=>{
    const totalSede = s.crec + s.warriors + s.relevo;

    const sedeDiv = document.createElement("div");
    sedeDiv.className="sede";
    sedeDiv.innerHTML = `
      <h3>
        ${s.sede}
        <span>${totalSede} grupos</span>
      </h3>
      <div class="meta">
        🚫 No reportado: ${s.noReportado} |
        ⛔ No realizado: ${s.noRealizado}
      </div>
      <div class="content">
        <div class="tipo">CREC <strong>${s.crec}</strong></div>
        <div class="tipo">WARRIORS <strong>${s.warriors}</strong></div>
        <div class="tipo">RELEVO <strong>${s.relevo}</strong></div>
        <div class="tipo">NO REPORTADO <strong>${s.noReportado}</strong></div>
        <div class="tipo">NO REALIZADO <strong>${s.noRealizado}</strong></div>
      </div>
    `;

    sedeDiv.querySelector("h3").onclick = e=>{
      e.stopPropagation();
      sedeDiv.querySelector(".content").classList.toggle("active");
    };

    contentLugar.appendChild(sedeDiv);
  });

  lugarDiv.onclick = ()=> contentLugar.classList.toggle("active");
  dashboard.appendChild(lugarDiv);
});
