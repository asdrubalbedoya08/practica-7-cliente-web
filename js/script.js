function getSensor() {
  fetch(
    "https://burlywood-attached-integer--asdrubalbedoya.replit.app/sensores",
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          "Parece que hubo un problema con la consulta. Status Code: " +
            response.status
        );
        return;
      }

      return response.json();
    })
    .then((data) => {
      if (!data) return;

      let ul = document.getElementById("sensor-list");
      ul.innerHTML = "";

      data.forEach((sensor) => {
        let li = document.createElement("li");

        let icono = document.createElement("span");
        icono.textContent = "⚙";
        icono.style.marginRight = "10px";

        let nombre = document.createElement("span");
        nombre.textContent = sensor.nombre;

        li.appendChild(icono);
        li.appendChild(nombre);

        ul.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error al consultar los sensores:", error);
    });
}

function createSensor(sensorName) {
  if (!sensorName || sensorName.trim() === "") {
    mostrarMensaje("Debes ingresar un nombre para el sensor");
    return;
  }

  let sensor = {
    nombre: sensorName.trim(),
  };

  fetch(
    "https://burlywood-attached-integer--asdrubalbedoya.replit.app/sensores",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sensor),
    }
  )
    .then((response) => {
      if (response.status !== 201) {
        console.log(
          "Parece que hubo un problema con la consulta. Status Code: " +
            response.status
        );
        return;
      }

      return response.json();
    })
    .then((data) => {
      if (!data) return;

      mostrarMensaje(
        "Sensor agregado - id: " + data._id
      );

      document.getElementById("sensor-name").value = "";
    })
    .catch((error) => {
      console.error("Error al crear el sensor:", error);

      mostrarMensaje(
        "No se pudo agregar el sensor"
      );
    });
}

function mostrarMensaje(texto) {
  let mensaje = document.getElementById(
    "mensaje-interactivo"
  );

  mensaje.textContent = texto;
  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 4000);
}

function viewPage(page) {
  const pageSensorList =
    document.getElementById("page-sensor-list");

  const pageSensorAdd =
    document.getElementById("page-sensor-add");

  if (page === "page-sensor-list") {
    pageSensorList.style.display = "block";
    pageSensorAdd.style.display = "none";

    getSensor();
  } else {
    pageSensorList.style.display = "none";
    pageSensorAdd.style.display = "block";
  }
}

window.addEventListener("load", function () {
  const botonCrear =
    document.getElementById("btn-sensor-add");

  botonCrear.addEventListener("click", () => {
    const nombreSensor =
      document.getElementById("sensor-name").value;

    createSensor(nombreSensor);
  });

  viewPage("page-sensor-list");
});