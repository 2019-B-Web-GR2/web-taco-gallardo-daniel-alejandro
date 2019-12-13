import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {DeleteResult, Repository} from 'typeorm';

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
        return this._repositorioUsuario.save<UsuarioEntity>(DeleteResult);
    }

    deleteUsuario(id: number): Promise<UsuarioEntity> {
        // @ts-ignore
        return this._repositorioUsuario.delete(id);
    }

    actualizarUno(id: number, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        usuario.id = id;
        return this._repositorioUsuario.save(usuario);
    }

    buscar(where:any = {},skip:number = 0,take:number = 10) {
        this._repositorioUsuario.find({
            where: where,
            skip: skip,
            take: skip,
    })
    }
}
