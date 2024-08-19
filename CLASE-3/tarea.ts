/* 
# Consiga POO Ts
*Negocio:*
-Somos una empresa de Software (software factory) que se dedica a crear soluciones IT variadas
-Tenemos empleados del rubro IT
    *Tipos de empleados*
    *Project Manager
    *Developers
    *Disigners
    *Marketing
*Problema:*
Necesitamos crear un software que nos permita administrar el manejo de los empleados de la empresa
*Clase empleado:*
    *nombre
    *sueldo
    *fecha_de_contratacion
    *id_empleado
    *tipo: Project Manager, Developer, Disigner, Marketing
*Clase manejador empleados*
    *id_manejador
    *empleados (lista de empleados)
*metodos*
    *agregar_empleado
    *obtener_empleado_por_id
    *obtener_empleados_por_tipo
*/

class Empleado  {
    nombre: string
    sueldo: number
    fecha_de_contratacion: string
    id_empleado: number
    tipo: string

    constructor (nombre: string, sueldo: number, fecha_de_contratacion: string, id_empleado: number, tipo: string) {
        this.nombre = nombre
        this.sueldo = sueldo
        this.fecha_de_contratacion = fecha_de_contratacion
        this.id_empleado = id_empleado
        this.tipo = tipo
    }
}

class ManejadorEmpleados {
    id_manejador: number
    empleados: Empleado[]

    constructor (id_manejador: number, empleados: Empleado[]) {
        this.id_manejador = id_manejador
        this.empleados = empleados
    }

    agregar_empleado (empleado: Empleado) : Empleado[] {
        this.empleados.push(empleado)
        return this.empleados
    }

    obtener_empleado_por_id (id: number) : Empleado | undefined {
        return this.empleados.find((empleado: Empleado) => empleado.id_empleado === id);
    }

    obtener_empleados_por_tipo (tipo: string) : Empleado[] {
        return this.empleados.filter((empleado: Empleado) => {
            return (empleado.tipo === tipo)
        })
    }
}