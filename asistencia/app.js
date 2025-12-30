const dashboard = document.getElementById("dashboard");

const lugares = [...new Set(asistenciaData.map(a => a.lugar))];

lugares.forEach(lugar => {
  const lugarDiv = document.createElement("div");
  lugarDiv.className = "lugar";
  lugarDiv.innerHTML = `<h2>${lugar}</h2><div class="content"></div>`;

  const contentLugar = lugarDiv.querySelector(".content");

  asistenciaData.filter(a => a.lugar === lugar).forEach(s => {
    const sedeDiv = document.createElement("div");
    sedeDiv.className = "sede";
    sedeDiv.innerHTML = `
      <h3>${s.sede}</h3>
      <div class="content">
        <div class="bloque">
          <h4>Hermanos</h4>
          <div class="fila"><span>Total</span><span>${s.hermanos.total}</span></div>
          <div class="fila"><span>Nuevos</span><span>${s.hermanos.nuevos}</span></div>
          <div class="fila"><span>Conversiones</span><span>${s.hermanos.conversiones}</span></div>
          <div class="fila"><span>Grupo</span><span>${s.hermanos.grupo}</span></div>
          <div class="fila"><span>Culto</span><span>${s.hermanos.culto}</span></div>
        </div>

        <div class="bloque">
          <h4>Niños</h4>
          <div class="fila"><span>Total</span><span>${s.ninos.total}</span></div>
          <div class="fila"><span>Nuevos</span><span>${s.ninos.nuevos}</span></div>
          <div class="fila"><span>Conversiones</span><span>${s.ninos.conversiones}</span></div>
          <div class="fila"><span>Grupo</span><span>${s.ninos.grupo}</span></div>
          <div class="fila"><span>Culto</span><span>${s.ninos.culto}</span></div>
        </div>
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
