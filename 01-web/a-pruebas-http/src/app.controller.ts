import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
  private holaMundo(): void {
    // tslint:disable-next-line:no-console
    console.log('Hola');
  }
  holaMundo2() {
    // tslint:disable-next-line:no-console
    console.log('Hola');
  }
}
