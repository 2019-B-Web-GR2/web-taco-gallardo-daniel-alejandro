import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService: UsuarioService
    ){}
    @Get(':id')
obtenerUsuario( @Param('id') identificador: string,): Promise<UsuarioEntity | undefined> {
        return this._usuarioService.encontrarUno(Number(identificador));

    }
    @Post()
    @HttpCode(200)
    public almorzar(
        @Body() usuario: UsuarioEntity
    ) {
        return this._usuarioService.crearUsuario(usuario)
    }

    @Get('hola')
    hola(): string {
        return 'hola';
    }
}
