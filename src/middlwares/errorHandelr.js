// Importa EError y otros módulos necesarios
import { EError } from "../enums/EError.js";

// Función para generar mensajes de error personalizados
function createErrorMsg(errCode) {
  switch (errCode) {
    case EError.PRODUCT_NOT_FOUND:
      return 'El producto solicitado no existe.';
    case EError.AUTH_ERROR:
      return 'Error de autenticación.';
    case EError.INVALID_JSON:
      return 'Los datos proporcionados son inválidos.';
    case EError.DATABASE_ERROR:
      return 'Error en la base de datos.';
    case EError.INVALID_PARAM:
      return 'Parámetro inválido.';
    default:
      return 'Error desconocido.';
  }
}

// Middleware de gestión de errores
export const errorHandler = (err, req, res, next) => {
  switch (err.code) {
    case EError.PRODUCT_NOT_FOUND:
      const errMsgProductNotFound = createErrorMsg(err.code);
      return res.status(404).json({ error: errMsgProductNotFound });
    case EError.AUTH_ERROR:
      const errMsgAuthError = createErrorMsg(err.code);
      return res.status(401).json({ error: errMsgAuthError });
    case EError.INVALID_JSON:
      const errMsgInvalidJson = createErrorMsg(err.code);
      return res.status(400).json({ error: errMsgInvalidJson });
    case EError.DATABASE_ERROR:
      const errMsgDatabaseError = createErrorMsg(err.code);
      return res.status(500).json({ error: errMsgDatabaseError });
    case EError.INVALID_PARAM:
      const errMsgInvalidParam = createErrorMsg(err.code);
      return res.status(400).json({ error: errMsgInvalidParam });
    default:
      const errMsgUnknownError = createErrorMsg(err.code);
      return res.status(500).json({ error: errMsgUnknownError });
  }
};
