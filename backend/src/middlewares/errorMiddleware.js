/**
 * Middleware centralizado de manejo de errores.
 * Captura errores lanzados en controllers y retorna respuestas JSON con el código apropiado.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;
