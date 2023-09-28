CRUD y Autenticacion de usuarios

Usuario creado para pruebas = {
        "name": "test1",
        "email": "test1@gmail.com",
        "status": true,
        "uid": "6515e8a566ca0362d58f6e2a"
    }

NOTA: JWT va en el encabezado authorization de tipo Bearer

Rutas --

Principal de usuarios:

    /api/users

    GET '/:id':
        - JWT Valido

    GET '/': No necesita autenticacion ni roles.

    POST '/':
        - name
        - password (6 caracteres minimo)
        - email

    PUT '/:id':
        - name
        - password
        - email

    DELETE '/:id':
        - JWT Valido

Ruta de autenticacion:

    /api/auth

    POST '/login':
        - email
        - password
