import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmCoreModule} from '@nestjs/typeorm/dist/typeorm-core.module';
import {UsuarioEntity} from './usuario/usuario.entity';
import {UsuarioModule} from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule,
      TypeOrmCoreModule.forRoot(
      {
          type: 'mysql',
          name: 'default',
        host: 'localhost',
        port: 32783,
        username: 'daniel',
        password: '1234',
        database: 'web',
        entities: [
            UsuarioEntity,
        ],
        synchronize: true},
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
