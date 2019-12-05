// @ts-ignore
import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Query} from '@nestjs/common';
import {AppService} from './app.service';

// @ts-ignore
let points: number = 100;
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('suma')
    @HttpCode(200)
    public sumar(
        @Headers() cabeceras: any,
        @Headers('numero1') n1: string,
        @Headers('numero2') n2: string,
    ) {
        // tslint:disable-next-line:no-console
        console.log(cabeceras);
        // tslint:disable-next-line:radix
        const resultado: number = parseInt(n1) + parseInt(n2);
        points = (points - resultado);
        if (points <= 0) {
            points = 100;
            return `Se acabaron los puntos\n El resultado de la suma es: ${resultado}`;
        } else {
            return `Puntos: ${points}  \nEl resultado de la suma es: ${resultado}`;
        }
    }

    @Post('resta')
    @HttpCode(201)
    public restar(
        @Body('numero1') n1: string,
        @Body('numero2') n2: string,
    ): string {
        // tslint:disable-next-line:radix
        const resultado: number = parseInt(n1) - parseInt(n2);
        points = points - resultado;
        if (points <= 0) {
            points = 100;
            return `Se acabaron los puntos\n El resultado de la resta es: ${resultado}`;
        } else {
            return `Puntos: ${points} \nEl resultado de la resta es: ${resultado}`;
        }
    }

    @Put('multiplicacion')
    @HttpCode(202)
    public multiplicar(
        @Query('numero1')n1: string,
        @Query('numero2')n2: string,
    ) {
        // tslint:disable-next-line:no-console
        console.log(`${n1} ${n2}`);
        // tslint:disable-next-line:radix
        const resultado: number = parseInt(n1) * parseInt(n2);
        points = points - resultado;
        if (points <= 0) {
            points = 100;
            return `Se acabaron los puntos\n El resultado de la multiplicacion es: ${resultado}`;
        } else {
            return `Puntos: ${points} \nEl resultado de la multiplicacion es: ${resultado}`;
        }
    }

    @Delete('division')
    @HttpCode(200)
    public dividir(
        @Headers() cabeceras: any,
        @Headers('numero1') n1: string,
        @Headers('numero2') n2: string,
    ) {
        // tslint:disable-next-line:no-console
        console.log(cabeceras);
        // tslint:disable-next-line:radix
        const resultado: number = parseInt(n1) / parseInt(n2);
        points = points - resultado;
        if (points <= 0) {
            points = 100;
            return `Se acabaron los puntos\n El resultado de la division es: ${resultado}`;
        } else {
            return `Puntos: ${points} \nEl resultado de la division es: ${resultado}`;
        }
    }
}
