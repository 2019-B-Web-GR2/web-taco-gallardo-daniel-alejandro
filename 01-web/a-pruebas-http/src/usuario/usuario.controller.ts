import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Session
} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./usuario.update-dto";

@Controller('usuario')
export class UsuarioController {

    // Admiminstrador puede crear, actualizar y eliminar
    // Supervisor puede actualizar
    constructor(
        private readonly _usuarioService: UsuarioService
    ){}
    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session
    ) {
        console.log('Session', session);
        if (username === 'adrian' && password === '1234') {
            session.usuario = {
                nombre: 'Adrian',
                userId: 1,
                roles: ['Administrador']
            }
            return 'ok';
        }
        if (username === 'vicente' && password === '1234') {
            session.usuario = {
                nombre: 'Vicente',
                userId: 2,
                roles: ['Supervisor']
            }
            return 'ok';
        }
        throw new BadRequestException('No envia credenciales');
    }

    @Get('sesion')
    sesion(
        @Session() session
    ) {
        return session;
    }

    @Get('hola')
    hola(): string {
        return `
<html>
        <head> <title>EPN</title> </head>
        <body>
        <h1> Mi primera pagina web </h1>
</body>
</html>`;
    }

    @Get(':id')
    obtenerUsuario( @Param('id') identificador: string,): Promise<UsuarioEntity | undefined> {
        return this._usuarioService.encontrarUno(Number(identificador));

    }
    @Post()
    @HttpCode(200)
    public async crearUsuario(
        @Body() usuario: UsuarioEntity,
        @Session() session
    ): Promise<UsuarioEntity> {
        if(session.usuario.roles[0] === 'Administrador'){
            const usuarioCreateDTO = new UsuarioCreateDto();
            // @ts-ignore
            usuarioCreateDTO.nombre = usuario.nombre;
            // @ts-ignore
            usuarioCreateDTO.cedula = usuario.cedula;
            const errores = await validate(usuarioCreateDTO);
            if(errores.length > 0){
                throw new BadRequestException("Error de validacion");
            }
            else{
                return this._usuarioService.crearUsuario(usuario);
            }
        }
        else
        {
            throw new BadRequestException('No tiene los permisos suficientes para realizar esta operacion')
        }
    }

    @Put(':id')
    public async actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
        @Session() session
    ): Promise<UsuarioEntity> {
        if(session.usuario.roles[0] === 'Administrador' || session.usuario.roles[0] === 'Supervisor'){
            const usuarioUpdateDTO = new UsuarioUpdateDto();
            // @ts-ignore
            usuarioUpdateDTO.nombre = usuario.nombre;
            // @ts-ignore
            usuarioUpdateDTO.cedula = usuario.cedula;
            usuarioUpdateDTO.id = +id;
            const errores = await validate(usuarioUpdateDTO);
            console.log(errores);
            if (errores.length > 0) {
                throw new BadRequestException('Error validando');
            } else {
                return this._usuarioService
                    .actualizarUno(
                        +id,
                        usuario,
                    );
            }
        }else{
            throw new BadRequestException('No tiene los permisos suficientes para realizar esta operacion')
        }
    }

    @Delete(':id')
    eliminarUno(
        @Param('id') id: string,
        @Session() session
    ): Promise<DeleteResult> {
        if(session.usuario.roles[0] === 'Administrador'){
            return this._usuarioService
                .deleteUsuario(
                    +id
                );
        }else{
            throw new BadRequestException('Usuario no permitido para Eliminar')
        }
    }

    @Get()
    async buscar(@Query('skip')skip?: string | number,
           @Query('take') take?: string | number,
           @Query('where') where?: string,
           @Query('order') order?: string,): Promise<UsuarioEntity[]>{
        if(where){
            try {
                where = JSON.parse(where);
            }
            catch (e) {
                where = undefined;
            }
        }
        if(order){
            try {
                order = JSON.parse(order);
            }
            catch (e) {
                order = undefined;
            }
        }
        if(skip){
            skip = +skip;
           // const newSchema = Joi.object({
             //   skip: Joi.number()
            //});
            //try {
              //  const value = await newSchema.validateAsync({skip: skip});
                //console.log('objetoValidado',value)
            //}
            //catch (err) {
              //  console.error('Error',err)
            //}

        }
        if(take){
            take = +take;
        }
        return this._usuarioService.buscar(where, skip as number,take as number, order);
    }

}
