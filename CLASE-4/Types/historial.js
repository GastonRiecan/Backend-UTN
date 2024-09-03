"use strict";
class Action {
    /**
     * Constructor de la clase Action.
     * @param {number} id El identificador de la accion.
     * @param {string} description La descripcion de la accion.
     * @param {Date} date La fecha en que se realiza la la accion.
     */
    constructor(id, description, date) {
        this.id = id;
        this.description = description;
        this.date = date;
    }
    /**
     * Muestra los detalles de la accion en la consola.
     */
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
    }
}
class ActionLogin extends Action {
    constructor(id, description, date, dispositivo_origen) {
        super(id, description, date);
        this.dispositivo_origen = dispositivo_origen;
    }
    /**
     * Muestra los detalles de la acción de Login en la consola.
     */
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Dispositivo Origen: ${this.dispositivo_origen}`);
    }
}
class ActionLogout extends Action {
    /**
     * Constructor de la clase ActionLogout.
     * @param {number} id El identificador de la acción.
     * @param {string} description La descripción de la acción.
     * @param {Date} date La fecha en que se realizó la acción.
     * @param {string} dispositivo_origen El dispositivo origen de la acción.
     * @param {number} tiempo_de_sesion El tiempo de sesión en segundos.
     */
    constructor(id, description, date, dispositivo_origen, tiempo_de_sesion) {
        super(id, description, date);
        this.dispositivo_origen = dispositivo_origen;
        this.tiempo_de_sesion = tiempo_de_sesion;
    }
    /**
     * Muestra los detalles de la acción de Logout en la consola.
     */
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Dispositivo Origen: ${this.dispositivo_origen}`);
        console.log(`Tiempo de Sesion: ${this.tiempo_de_sesion}`);
    }
}
class Change {
    /**
     * Constructor de la clase Change.
     * @param {number} id_cambio El identificador del cambio.
     * @param {string} valor_anterior El valor anterior del campo en el perfil.
     * @param {string} nuevo_valor El nuevo valor del campo en el perfil.
     */
    constructor(id_cambio, valor_anterior, nuevo_valor) {
        this.id_cambio = id_cambio;
        this.valor_anterior = valor_anterior;
        this.nuevo_valor = nuevo_valor;
    }
    /**
     * Muestra los detalles del cambio en la consola.
     */
    mostrarCambio() {
        console.log(`ID: ${this.id_cambio}`);
        console.log(`Valor Anterior: ${this.valor_anterior}`);
        console.log(`Nuevo Valor: ${this.nuevo_valor}`);
    }
}
class ActionPerfilUpdate extends Action {
    /**
     * Constructor de la clase ActionPerfilUpdate.
     * @param {number} id El identificador de la acción.
     * @param {string} description La descripción de la acción.
     * @param {Date} date La fecha en que se realizó la acción.
     * @param {Change[]} changes Los cambios realizados en el perfil.
     */
    constructor(id, description, date, changes) {
        super(id, description, date);
        this.changes = changes;
    }
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Cambios: ${this.changes}`);
    }
}
class BuyAction extends Action {
    /**
     * Constructor de la clase BuyAction.
     * @param {number} id El identificador de la acción.
     * @param {string} description La descripción de la acción.
     * @param {Date} date La fecha en que se realizó la acción.
     * @param {string[]} productos Los productos comprados en la acción.
     * @param {number} total El total de la compra.
     */
    constructor(id, description, date, productos, total) {
        super(id, description, date);
        this.productos = productos;
        this.total = total;
    }
    /**
     * Muestra los detalles de la acción de Compra en la consola.
     * Se muestran el ID, descripción, fecha, productos comprados y total de la compra.
     */
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Productos: ${this.productos}`);
        console.log(`Total: ${this.total}`);
    }
}
class SendMessageAction extends Action {
    /**
     * Constructor de la clase SendMessageAction.
     * @param {number} id El identificador de la acción.
     * @param {string} description La descripción de la acción.
     * @param {Date} date La fecha en que se realizó la acción.
     * @param {string} mensaje El mensaje enviado en la acción.
     * @param {string} destinatario El destinatario del mensaje.
     */
    constructor(id, description, date, mensaje, destinatario) {
        super(id, description, date);
        this.mensaje = mensaje;
        this.destinatario = destinatario;
    }
    /*
     * Muestra los detalles de la acción de Envío de Mensaje en la consola.
     * Se muestran el ID, descripción, fecha, destinatario y mensaje.
     */
    mostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripción: ${this.description}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Destinatario: ${this.destinatario}`);
        console.log(`Mensaje: ${this.mensaje}`);
    }
}
class Historial {
    /**
     * Constructor de la clase Historial.
     * Inicializa la lista de acciones en vacío.
     */
    constructor() {
        this.acciones = [];
    }
    /**
     * Agrega una acción al historial.
     * @param {Action} action La acción a agregar.
     */
    addAction(action) {
        this.acciones.push(action);
    }
    /**
     * Elimina la acción con el ID especificado del historial.
     * Si no existe una acción con ese ID, no hace nada.
     * @param {number} id El ID de la acción a eliminar.
     */
    deleteActionByID(id) {
        this.acciones = this.acciones.filter((action) => action.id !== id);
    }
    /**
     * Elimina todas las acciones del historial.
     */
    deleteAllActions() {
        this.acciones = [];
    }
    /**
     * Muestra en la consola todas las acciones en el historial.
     * Para cada acción, se llama al método `mostrarDetalle()` para mostrar
     * sus detalles.
     */
    showHistorial() {
        this.acciones.forEach((action) => {
            action.mostrarDetalle();
        });
    }
}
//SECCION DE PRUEBAS:
console.log("SECCION DE PRUEBA DE CLASES:");
let action1 = new Action(1, "Primer Accion", new Date());
action1.mostrarDetalle();
let action2 = new Action(2, "Segunda Accion", new Date());
action2.mostrarDetalle();
let action3 = new Action(3, "Tercera Accion", new Date());
action3.mostrarDetalle();
let log = new ActionLogin(2, "Login", new Date(), "I Phone x");
log.mostrarDetalle();
let logout = new ActionLogout(3, "Logout", new Date(), "I Phone x", 15);
logout.mostrarDetalle();
let cambio = new Change(4, "Antiguo valor", "Nuevo valor");
cambio.mostrarCambio();
let modificarPefil = new ActionPerfilUpdate(5, "Modificando perfil", new Date(), [cambio]);
modificarPefil.mostrarDetalle();
let compras = new BuyAction(6, "Comprando", new Date(), ["I Phone x", "Samsung a21s"], 5000000);
let mensajesEnviados = new SendMessageAction(7, "Enviando Mensaje", new Date(), "Hola", "Pepe");
console.log("SECCION DE PRUEBA DE HISTORIAL:");
let h1 = new Historial();
h1.addAction(action1);
h1.addAction(action2);
h1.addAction(action3);
h1.addAction(log);
h1.addAction(logout);
h1.addAction(cambio);
h1.addAction(modificarPefil);
h1.addAction(compras);
h1.addAction(mensajesEnviados);
h1.showHistorial();
console.log(h1.acciones.length + ": Cantidad de acciones en el historial");
h1.deleteActionByID(1);
console.log(h1.acciones.length + ": Cantidad de acciones en el historial, luego de eliminar una accion");
h1.deleteAllActions();
console.log(h1.acciones.length + ": Cantidad de acciones en el historial, luego de eliminar todas las acciones");
h1.showHistorial();
