var app = require('./app');

var port = process.env.PORT || 3002
// Start server
app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:' + port);
});
