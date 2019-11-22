import {Controller, Get, HttpCode, InternalServerErrorException, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito') // Decorador: seggmento url -> "/pepito"
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // http://localhost:3000/pepito/hola-mundo
    @Get('hola-mundo')// -> url "/"
    getHello(): string {
        return 'Hola mundo';
    }

    @HttpCode(200)
    @Post('EsPar')
    adiosMundo(): string {
        const segundos = this.obtenerSegundos();
        if (segundos % 2 === 0) {
            return 'Adios Mundo!';
        } else {
            throw new InternalServerErrorException('Es impar');
        }

    }

    private obtenerSegundos(): number {
        return new Date().getSeconds();
    }
}

// Typescript
// Declaracion de variables
// No utilizar
// var nombre:string = "Daniel";
let apellido: string = 'Taco'; // Mutable
const cedula: string = '1718...'; // Inmutable
apellido = 'Gallardo'; // RE ASIGNADO
// cedula = "18"; // INMUTABLE
const casado: boolean = false; // boolean
const edad: number = 30; // number
const sueldo: number = 12.12; // number
let hijos = 0;
hijos = null; // null
// tslint:disable-next-line:prefer-const
let ojos; // undefined

// TRUTY - FALSY
// con tres iguales compara hasta el tipo de dato
if (true) {
    // tslint:disable-next-line:no-console
    console.log('Truty');
} else {
    // tslint:disable-next-line:no-console
    console.log('Falsy');
}
if (0) {
    // tslint:disable-next-line:no-console
    console.log('Falsy');
}
if (-1) {
    // tslint:disable-next-line:no-console
    console.log('Truty');
}
if (-1) {
    // tslint:disable-next-line:no-console
    console.log('Truty');
}

if ('') {
    // tslint:disable-next-line:no-console
    console.log('Truty');
}

if ('abc') {
    // tslint:disable-next-line:no-console
    console.log('Truty');
}

// tslint:disable-next-line:max-classes-per-file
class Usuario {
    public cedula: string = '1723926612';
    cedula2 = '0501651418';
    // tslint:disable-next-line:no-shadowed-variable
    // constructor(cedula: string){
    // this.cedula = cedula;
    // }
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public nombre: string, public apellido: string) { // Crear una propiedad
        // LLamada nombre y recibir paramatreo y asignarlo a la propiedad nombre

    }

    private holaMundo(): void {
        // tslint:disable-next-line:no-console
        console.log('Hola');
    }

    holaMundo2() {
        // tslint:disable-next-line:no-console
        console.log('Hola');
    }
}

// tslint:disable-next-line:max-classes-per-file
class Usuario2 {
    constructor(
        public nombre: string, // parametro opcional
        // tslint:disable-next-line:no-shadowed-variable
        public apellido?: string, // parametro requerido
    ) {
    }
}

const daniel = new Usuario2('Daniel');
const alejandro = new Usuario2('Alejandro', 'Gallardo');

// tslint:disable-next-line:max-classes-per-file
class Empleado extends Usuario2 {
    constructor(nombre: string,
                public numeroContrato: string,
                // tslint:disable-next-line:no-shadowed-variable
                apellido?: string) {
        super(nombre, apellido);
    }
}

const empleadoDaniel = new Empleado('Daniel', '1234');

interface Pelota {
    diametro: number;
    color?: string;
}

const balonFutbol: Pelota = {
    diametro: 1,
    color: 'amazul',
};

// tslint:disable-next-line:max-classes-per-file
class Juego implements Pelota {
    diametro: number;
}

interface Entrenador {
    id: number;
    nombre: string;
}

interface Pokemon {
    id: number;
    nombre: string;
    entrenador: Entrenador | number; // Foreing key
}

const ash: Entrenador = {
    id: 1,
    nombre: 'Ash',
};
const pikachu: Pokemon = {
    id: 1,
    nombre: 'Pikachu',
    entrenador: 1,
};

const suma = pikachu.entrenador as number + pikachu.id;
const suma2 = pikachu.entrenador as number as number + pikachu.id;
