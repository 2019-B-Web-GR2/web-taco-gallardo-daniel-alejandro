import {
    Body,
    Controller,
    Get, Headers,
    HttpCode,
    InternalServerErrorException,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import {AppService} from './app.service';
import {get} from 'http';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    @Get('bienvenida')
    public bienvenida(
        @Query() parametrosDeConsulta: ObjetoBienvenida,
        @Query('nombre') nombreUsuario: string,
        @Query('numero') numeroUsuario: number,
        @Query('casado') casadoUsuario: boolean,
    ): string {
        // tslint:disable-next-line:no-console
        console.log(parametrosDeConsulta);
        // tslint:disable-next-line:no-console
        console.log(typeof nombreUsuario);
        // tslint:disable-next-line:no-console
        console.log(typeof numeroUsuario);
        // tslint:disable-next-line:no-console
        console.log(typeof casadoUsuario);
        // template strings \\ 'Mensaje ${variable}'
        return 'Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.numero}';
    }

    @Get('inscripcion-curso/:idCurso/:cedula') // /:nombreParametro
    public inscripcionCurso(
        @Param() parametrosDeRuta: ObjetoInscripcion,
        @Param('idCurso') idCurso: string,
        // tslint:disable-next-line:no-shadowed-variable
        @Param('cedula') cedula: string,
    ): string {
        // tslint:disable-next-line:no-console
        console.log(parametrosDeRuta);
        // template strings \\ 'Mensaje ${variable}'
        return 'Te inscribiste al curso: ${parametrosDeRuta.idCurso}' +
            '${parametrosDeRuta.cedula}';
    }
    @Post('almorzar')
    @HttpCode(200)
    public almorzar(
        @Body() parametrosDeCuerpo,
        @Body('id') id: number,
    ): string {
        // tslint:disable-next-line:no-console
        console.log(parametrosDeCuerpo);
        // template strings \\ 'Mensaje ${variable}'
        return 'El id es: ${id}';
    }
    @Get('obtener-cabeceras')
    obtenerCabeceras(
        @Headers() cabeceras,
        @Headers('numerouno') numeroUno: string,
    ) {
        // tslint:disable-next-line:no-console
        console.log(cabeceras);
        return 'Las cabeceras son ${numeroUno}';
    }

}

interface ObjetoBienvenida {
    idCurso?: string;
    cedula: string;
}
interface ObjetoInscripcion {
    nombre?: string;
    numero?: string;
    casado?: string;
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
