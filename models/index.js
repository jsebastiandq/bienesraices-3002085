import Propiedades from "./Propiedades.js";
import Precios from "./Precios.js";
import Categorias from "./Categorias.js";
import Usuarios from "./Usuarios.js";
import Mensaje from "./Mensaje.js";

Propiedades.belongsTo(Precios, { ForeignKey: "preciosId" });
Propiedades.belongsTo(Categorias, { ForeignKey: "categoriasId" });
Propiedades.belongsTo(Usuarios, { ForeignKey: "UsuarioId" });

Mensaje.belongsTo(Propiedades, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuarios, { foreignKey: "usuarioId" });

export { Propiedades, Precios, Categorias, Usuarios, Mensaje };
