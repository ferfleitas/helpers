require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

async function firmarYMostrarJWT() {
  try {
    // Leer las claves
    const privateKeyPath = path.join(__dirname, './private.key');
    const publicKeyPath = path.join(__dirname, './public.key');

    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      throw new Error('No se encontraron las claves en ./keys/');
    }

    const privateKEY = fs.readFileSync(privateKeyPath, 'utf8');
    const publicKEY = fs.readFileSync(publicKeyPath, 'utf8');

    // Crear payload
    const payload = {
      iss: process.env.ISS, // Emisor del token
      iat: Math.floor(Date.now() / 1000), // Fecha de emisión
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira en 1 hora
    };

    // Firmar el JWT
    const token = jwt.sign(payload, privateKEY, { algorithm: 'RS256' });
    console.log('token JWT firmado:\n');
    console.log(token);
    console.log('\n');

    // Verificar el JWT usando la clave pública
    const decoded = jwt.verify(token, publicKEY, { algorithms: ['RS256'] });
    console.log('Token verificado correctamente:\n', decoded);
  } catch (error) {
    console.error('Error al firmar o verificar el JWT:\n', error.message);
  }
}

// Ejecutar la función
firmarYMostrarJWT();