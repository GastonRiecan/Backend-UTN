/* Tema pendiente de Typescript */


/* 
Datos primitivos
Funciones
Objetos Literales
Arrays?
Metodos avanzados de Arrays?
*/

/* const lista_productos : Producto[] = [
    {
        nombre: 'tv noblex',
        id: 2,
        precio: 30,
        descripcion: 'lorem',
        title: 'La mejor'
    },
    {
        nombre: 'tv LG',
        id: 3,
        precio: 50,
        descripcion: 'lorem',
        title: 'Si'
    }
] */

/* 
forEach => void

map => array

filter => array con el tipo de array original
Productos[] =>  filter() => Productos[]

find => elemento del array | undefined
Productos[] => find() => Producto | undefined
Item[] => find() => Item | undefined

findIndex => number 
 */

/* Quiero un array de booleanos donde los productos cuyo precio 
sea menor a 40 esten como true, pero los que sean mayores o iguales esten como false

[
    {precio: 10},
    {precio: 20},
    {precio: 41},
    {precio: 50}
]

return 

[
    true,
    true,
    false,
    false
]

*/
/* 
interface Producto {
    nombre: string,
    id: number,
    precio: number,
    descripcion: string,
    title: string,
}
const producto_1 : Producto = {
    nombre: 'tv LG',
    id: 1,
    precio: 10,
    descripcion: 'lorem',
    title: 'Si'
}
const lista_productos : Producto[] = [
    producto_1,
    {
        nombre: 'tv noblex',
        id: 2,
        precio: 20,
        descripcion: 'lorem',
        title: 'La mejor'
    },
    {
        nombre: 'tv LG',
        id: 3,
        precio: 41,
        descripcion: 'lorem',
        title: 'Si'
    }
    {
        nombre: 'tv LG mas caro',
        id: 4,
        precio: 50,
        descripcion: 'lorem',
        title: 'Si'
    }
]
const menorA40 : boolean[] = lista_productos.map((producto : Producto) : boolean => producto.precio < 40)

console.log(menorA40);
 */

/* Aqui veremos POO en Typescript */

