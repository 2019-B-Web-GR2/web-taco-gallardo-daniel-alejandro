import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";

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
    public async crearUsuario(
        @Body() usuario: UsuarioEntity
    ) {
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

    @Put(':id')
    actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
    ): Promise<UsuarioEntity> {
        return this._usuarioService.actualizarUno(+id,usuario);
    }

    @Delete(':id')
    eliminarUno(
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this._usuarioService.deleteUsuario(+id);
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

    @Get('hola')
    hola(): string {
        return 'hola';
    }
}
