import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {DeleteResult, Equal, LessThan, Like, MoreThan, Repository} from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(UsuarioEntity)
                // tslint:disable-next-line:variable-name
                private _repositorioUsuario: Repository<UsuarioEntity>,
                // tslint:disable-next-line:no-empty
    ) {
    }

    // @ts-ignore
    // async encontrarUno(id: number){
    //   const usuario = await this._repositorioUsuario.findOne(id);
    // console.log(usuario);
    //console.log(':D termino en orden yupi');
    // return usuario;
    //}
    encontrarUno(id: number): Promise<UsuarioEntity | undefined> {
        return this._repositorioUsuario.findOne(id);
    }

    crearUsuario(usuario: UsuarioEntity) {
        // @ts-ignore
        return this._repositorioUsuario.save(usuario);
    }

    deleteUsuario(id: number): Promise<DeleteResult> {
        // @ts-ignore
        return this._repositorioUsuario.delete(id);
    }

    actualizarUno(id: number, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        usuario.id = id;
        return this._repositorioUsuario.save(usuario);
    }


    buscar(where:any = {},skip:number = 0,take:number = 10, order: any = {id:'DESC', nombre: 'ASC'}): Promise<UsuarioEntity[]> {

        //Exactamente el nombre o Exactamente la cedula
        const consultaWhere = [
            {
                nombre: ''
            },
            {
                cedula: ''
            }
        ];
        //Exactamente el nombre o Exactamente la cedula
        const consultaWhereLike = [
            {
                nombre: Like('%a%a')
            },
            {
                cedula: Like('%a%a')
            }
        ];
        //Exactamente el nombre o Exactamente la cedula
        const consultaWhereMoreThan = [
            {
                id: MoreThan(20)
            }];
        //Exactamente el nombre o Exactamente la cedula
        const consultaWhereLessThan = [
            {
                id: LessThan(20)
            }
        ];
        const consultaWhereEqual = [
            {
                id: Equal(20)
            }
        ];
        return this._repositorioUsuario.find({
            where: where,
            skip: skip,
            take: take,
            order: order,
    })
    }
}
