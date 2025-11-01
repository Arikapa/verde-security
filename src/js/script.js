// === Obtener la URL base del .env ===
const API_URL = import.meta.env.VITE_API_URL;

// === Crear los botones dinámicamente ===
const contenedor = document.getElementById("Contenido");

const secciones = [
  { name: "Users", endpoint: "users" },
  { name: "Profiles", endpoint: "profiles" },
  { name: "Addresses", endpoint: "addresses" },
  { name: "Digital Signatures", endpoint: "digital-signatures" }
];

secciones.forEach(sec => {
  const btn = document.createElement("button");
  btn.textContent = `GET ${sec.name}`;
  btn.style.margin = "5px";
  btn.addEventListener("click", () => obtenerDatos(sec.endpoint, sec.name));
  contenedor.appendChild(btn);
});

const resultado = document.createElement("div");
resultado.style.marginTop = "20px";
contenedor.appendChild(resultado);

// === Función para hacer la solicitud GET ===
async function obtenerDatos(endpoint, nombre) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
    const data = await res.json();

    console.clear(); // Se borran los datos de la consola antes de mostrar los nuevos
    console.log(`=== ${nombre.toUpperCase()} ===`);
    console.log(data);

    resultado.innerHTML = `
      <h3>${nombre}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    resultado.innerHTML = `<p style="color:red;">Error al obtener ${nombre}</p>`;
  }
}
