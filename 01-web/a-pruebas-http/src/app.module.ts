import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmCoreModule} from '@nestjs/typeorm/dist/typeorm-core.module';
import {UsuarioEntity} from './usuario/usuario.entity';
import {UsuarioModule} from './usuario/usuario.module';
import {UsuarioService} from './usuario/usuario.service';

// @ts-ignore
@Module({
    imports: [UsuarioModule,
        TypeOrmCoreModule.forRoot(
            {
                type: 'mysql',
                name: 'default',
                host: 'localhost',
                port: 32777,
                username: 'daniel',
                password: '1234',
                database: 'web',
                //dropSchema: true,
                entities: [
                    UsuarioEntity,
                ],
                synchronize: true,
            },
        )],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        // tslint:disable-next-line:variable-name
        private _usuarioService: UsuarioService,
    ) {
        const usuarioPromesa = this._usuarioService
            .encontrarUno(1).then().catch();
    }
}
