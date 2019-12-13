import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

// @ts-ignore
@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'id_web',
        comment: 'Identificador de la tabla usuario',
    })
    id: number;
@Index({
    unique: false,
})
@Column({
    type: 'varchar',
    nullable: true,
    name: 'nombre',
    comment: 'Nombre de la tabla usuario'
})
nombre ? : String

@Index({
     unique: false,
})
@Column({
    type: 'varchar',
    nullable: true,
    name: 'cedula',
    comment: 'Cedula de la tabla usuario'
})
cedula ? : String

}
