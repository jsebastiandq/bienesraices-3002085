(function () {
  const cambiarEstadoBotones = document.querySelectorAll(".cambiar-estado");
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  cambiarEstadoBotones.forEach((boton) => {
    boton.addEventListener("click", cambiarEstadoPropiedad);
  });

  // Inicial: si viene No Publicado, agregar link
  cambiarEstadoBotones.forEach((boton) => {
    if (boton.textContent.trim() === "No Publicado") {
      agregarLinkEditar(boton);
    }
  });

  function agregarLinkEditar(boton) {
    const id = boton.dataset.propiedadId;

    // evitar duplicados
    if (
      boton.nextElementSibling &&
      boton.nextElementSibling.classList.contains("editar-imagen")
    ) {
      return;
    }

    const linkEditar = document.createElement("a");
    linkEditar.textContent = "Editar Imagen";
    linkEditar.href = `propiedades/agregar-imagen/${id}`;
    linkEditar.classList.add(
      "editar-imagen",
      "text-center",
      "px-2",
      "py-2",
      "md:py-1",
      "text-xs",
      "leading-5",
      "font-semibold",
      "rounded",
      "cursor-pointer",
      "bg-yellow-100",
      "text-yellow-800"
    );

    boton.after(linkEditar);
  }

  async function cambiarEstadoPropiedad(e) {
    const { propiedadId: id } = e.target.dataset;

    try {
      const url = `/propiedades/${id}`;
      const respuesta = await fetch(url, {
        method: "PUT",
        headers: {
          "CSRF-Token": token,
        },
      });

      const { resultado } = await respuesta.json();

      if (resultado) {
        if (e.target.classList.contains("bg-yellow-100")) {
          e.target.classList.add("bg-green-100", "text-green-800");
          e.target.classList.remove("bg-yellow-100", "text-yellow-800");
          e.target.textContent = "Publicado";

          // eliminar el link de editar si existe
          if (
            e.target.nextElementSibling &&
            e.target.nextElementSibling.classList.contains("editar-imagen")
          ) {
            e.target.nextElementSibling.remove();
          }
        } else {
          e.target.classList.remove("bg-green-100", "text-green-800");
          e.target.classList.add("bg-yellow-100", "text-yellow-800");
          e.target.textContent = "No Publicado";

          // crear link para editar imagen
          const linkEditar = document.createElement("a");
          linkEditar.textContent = "Editar Imagen";
          linkEditar.href = `propiedades/agregar-imagen/${id}`;
          linkEditar.classList.add(
            "editar-imagen",
            "text-center",
            "px-2",
            "py-2",
            "md:py-1",
            "text-xs",
            "leading-5",
            "font-semibold",
            "rounded",
            "cursor-pointer",
            "bg-yellow-100",
            "text-yellow-800"
          );
          // evitar duplicados
          if (
            !e.target.nextElementSibling ||
            !e.target.nextElementSibling.classList.contains("editar-imagen")
          ) {
            e.target.after(linkEditar);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
})();
