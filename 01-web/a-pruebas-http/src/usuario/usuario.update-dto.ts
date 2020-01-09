import {IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength} from "class-validator";

export class UsuarioUpdateDto {
    // @ts-ignore
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
        // @ts-ignore
    nombre: string;
    @IsEmpty()
        // @ts-ignore
    cedula: string;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
        // @ts-ignore
    id: number;
}