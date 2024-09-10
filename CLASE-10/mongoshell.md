Movernos a la base de datos que queremos usar:
use <nombre_base_de_datos>

Crear coleccion:
db.<nombre_base_de_datos>.createCollection("<nombre_coleccion>")
Ejemplo:
db.createCollection("usuarios")

## Insertar en nuestra coleccion:

db.<nombre_colleccion_a_insertar>.insertOne(Objeto_de_insercion)
db.<nombre_colleccion_a_insertar>.insertMany(Array_de_insercion)
Ejemplo:

db.usuarios.insertOne({
    nombre: "Pepe",
    email: "pepe@gmail.com",
    rol:"usuario",
    password: "pepesito123",
    nro_telefono: "+5465432168465",
    direccion: "Arg, bsas",
    creado_en: new Date()
})

db.usuarios.insertMany([
    {
        nombre: "Pepe",
        email: "pepe@gmail.com",
        rol:"usuario",
        password: "pepesito123",
        nro_telefono: "+5465432168465",
        direccion: "Arg, bsas",
        creado_en: new Date()
    },
    {
        nombre: "Juan",
        email: "juan@gmail.com",
        rol:"usuario",
        password: "juan123",
        nro_telefono: "+5465432168465",
        direccion: "Arg, bsas",
        creado_en: new Date()
    },
    {
        nombre: "Luis",
        email: "luis@gmail.com",
        rol:"usuario",
        password: "luis123",
        nro_telefono: "+5465432168465",
        direccion: "Arg, bsas",
        creado_en: new Date()
    },
])

## Buscar usuarios por email:
db.usuarios.find({email: "pepe@gmail.com"})

si quiero traer todos los usuarios: db.usuarios.find({})


Eliminar un usuario:
db.usuarios.deleteOne({_id: ObjectId("66d9b25d79d6ff88642b06d1")})

deleteMany para eliminar varios.

## Para actualizar:

db.usuarios.updateOne(
    { _id: ObjectId("66d9b25d79d6ff88642b06d1")},
    {
        $set: {
                email: "pepes@hotmail.com",
                nro_telefono: "1556116115615",
                password: "gaston123"
                }
    }
)
