/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n(function () {\n  const cambiarEstadoBotones = document.querySelectorAll(\".cambiar-estado\");\n  const token = document\n    .querySelector('meta[name=\"csrf-token\"]')\n    .getAttribute(\"content\");\n\n  cambiarEstadoBotones.forEach((boton) => {\n    boton.addEventListener(\"click\", cambiarEstadoPropiedad);\n  });\n\n  // Inicial: si viene No Publicado, agregar link\n  cambiarEstadoBotones.forEach((boton) => {\n    if (boton.textContent.trim() === \"No Publicado\") {\n      agregarLinkEditar(boton);\n    }\n  });\n\n  function agregarLinkEditar(boton) {\n    const id = boton.dataset.propiedadId;\n\n    // evitar duplicados\n    if (\n      boton.nextElementSibling &&\n      boton.nextElementSibling.classList.contains(\"editar-imagen\")\n    ) {\n      return;\n    }\n\n    const linkEditar = document.createElement(\"a\");\n    linkEditar.textContent = \"Editar Imagen\";\n    linkEditar.href = `propiedades/agregar-imagen/${id}`;\n    linkEditar.classList.add(\n      \"editar-imagen\",\n      \"text-center\",\n      \"px-2\",\n      \"py-2\",\n      \"md:py-1\",\n      \"text-xs\",\n      \"leading-5\",\n      \"font-semibold\",\n      \"rounded\",\n      \"cursor-pointer\",\n      \"bg-yellow-100\",\n      \"text-yellow-800\"\n    );\n\n    boton.after(linkEditar);\n  }\n\n  async function cambiarEstadoPropiedad(e) {\n    const { propiedadId: id } = e.target.dataset;\n\n    try {\n      const url = `/propiedades/${id}`;\n      const respuesta = await fetch(url, {\n        method: \"PUT\",\n        headers: {\n          \"CSRF-Token\": token,\n        },\n      });\n\n      const { resultado } = await respuesta.json();\n\n      if (resultado) {\n        if (e.target.classList.contains(\"bg-yellow-100\")) {\n          e.target.classList.add(\"bg-green-100\", \"text-green-800\");\n          e.target.classList.remove(\"bg-yellow-100\", \"text-yellow-800\");\n          e.target.textContent = \"Publicado\";\n\n          // eliminar el link de editar si existe\n          if (\n            e.target.nextElementSibling &&\n            e.target.nextElementSibling.classList.contains(\"editar-imagen\")\n          ) {\n            e.target.nextElementSibling.remove();\n          }\n        } else {\n          e.target.classList.remove(\"bg-green-100\", \"text-green-800\");\n          e.target.classList.add(\"bg-yellow-100\", \"text-yellow-800\");\n          e.target.textContent = \"No Publicado\";\n\n          // crear link para editar imagen\n          const linkEditar = document.createElement(\"a\");\n          linkEditar.textContent = \"Editar Imagen\";\n          linkEditar.href = `propiedades/agregar-imagen/${id}`;\n          linkEditar.classList.add(\n            \"editar-imagen\",\n            \"text-center\",\n            \"px-2\",\n            \"py-2\",\n            \"md:py-1\",\n            \"text-xs\",\n            \"leading-5\",\n            \"font-semibold\",\n            \"rounded\",\n            \"cursor-pointer\",\n            \"bg-yellow-100\",\n            \"text-yellow-800\"\n          );\n          // evitar duplicados\n          if (\n            !e.target.nextElementSibling ||\n            !e.target.nextElementSibling.classList.contains(\"editar-imagen\")\n          ) {\n            e.target.after(linkEditar);\n          }\n        }\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  }\n})();\n\n\n//# sourceURL=webpack://bienes-raices-sena/./src/js/cambiarEstado.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;