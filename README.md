# helpers

Repositorio de scripts varios, plantillas, códigos de prueba.



### Generador de claves pub y privada

```bash
# Generar clave privada
openssl genrsa -out private.key 2048

# Extraer clave pública
openssl rsa -in private.key -pubout -out public.key
```
