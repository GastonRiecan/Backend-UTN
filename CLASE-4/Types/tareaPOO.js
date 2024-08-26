"use strict";
/*
# Consigna: Crear y Gestionar un Historial Usando Programación Orientada a Objetos en JavaScript

En este ejercicio, vamos a crear un sistema básico de historial utilizando Programación Orientada
a Objetos (POO) en JavaScript. Imagina que tienes una lista de acciones que un usuario realiza en
una aplicación, y quieres guardar esas acciones en un historial para poder verlas más tarde,
eliminarlas individualmente o limpiar todo el historial.

## Objetivo

- **Crear una clase de historial** donde se puedan agregar, eliminar por ID y eliminar todas las acciones.
- **Usar métodos avanzados de arrays** como `filter`, `find`, y `findIndex` para gestionar el historial.
- **Aplicar conceptos de POO** como clases, objetos, métodos y encapsulamiento.

## Tareas

1. **Definir una clase `Historial`**:
  - Esta clase tendrá una propiedad interna para almacenar las acciones en un array.
  - Incluirá métodos para agregar una nueva acción, eliminar una acción por ID, eliminar todas las acciones y mostrar el historial.

2. **Crear una clase `Accion`**:
  - Cada acción será representada por una instancia de la clase `Accion`.
  - Esta clase tendrá propiedades para `id`, `descripcion` y `fecha`.

3. **Crear métodos en la clase `Historial`**:
   - **`agregarAccion(accion)`**: Método para agregar una nueva acción al historial.
   - **`eliminarAccionPorID(id)`**: Método para eliminar una acción específica del historial usando su ID.
   - **`eliminarTodo()`**: Método para eliminar todas las acciones del historial.
   - **`mostrarHistorial()`**: Método para mostrar en la consola todas las acciones en el historial.
*/
class Accion {
    constructor(id, descripcion, fecha) {
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}
class Historial {
    constructor() {
        this.acciones = [];
    }
    // Método para agregar una nueva acción
    agregarAccion(accion) {
        this.acciones.push(accion);
    }
    // Método para eliminar una acción por su ID
    eliminarAccionPorID(id) {
        const indice = this.acciones.findIndex(accion => accion.id === id);
        if (indice !== -1) {
            this.acciones.splice(indice, 1);
            return true;
        }
        return false;
    }
    // Método para eliminar todas las acciones
    eliminarTodo() {
        this.acciones = [];
    }
    // Método para mostrar todas las acciones en la consola
    mostrarHistorial() {
        console.log("Historial de acciones:");
        this.acciones.forEach(accion => {
            console.log(`ID: ${accion.id}, Descripción: ${accion.descripcion}, Fecha: ${accion.fecha}`);
        });
    }
}
// Crear instancias de la clase Accion
const accion1 = new Accion(1, "Primera acción", new Date("2024-08-01"));
const accion2 = new Accion(2, "Segunda acción", new Date("2024-08-02"));
const accion3 = new Accion(3, "Tercera acción", new Date("2024-08-03"));
// Crear una instancia de la clase Historial
const historial = new Historial();
// Agregar acciones al historial
historial.agregarAccion(accion1);
historial.agregarAccion(accion2);
historial.agregarAccion(accion3);
// Mostrar el historial actual
historial.mostrarHistorial();
// Eliminar una acción por ID
const eliminado = historial.eliminarAccionPorID(2);
console.log(`Acción eliminada: ${eliminado}`);
// Mostrar el historial después de eliminar
historial.mostrarHistorial();
// Eliminar todas las acciones
historial.eliminarTodo();
// Mostrar el historial vacío
historial.mostrarHistorial();
console.log("Programa finalizado.");
