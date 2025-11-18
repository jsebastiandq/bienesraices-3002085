import Propiedades from "./Propiedades.js";
import Precios from "./Precios.js";
import Categorias from "./Categorias.js";
import Usuarios from "./Usuarios.js";

Propiedades.belongsTo(Precios, { ForeignKey: "preciosId" });
Propiedades.belongsTo(Categorias, { ForeignKey: "categoriasId" });
Propiedades.belongsTo(Usuarios, { ForeignKey: "UsuarioId" });

export { Propiedades, Precios, Categorias, Usuarios };
