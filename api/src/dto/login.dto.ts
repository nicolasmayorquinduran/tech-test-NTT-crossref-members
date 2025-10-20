import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 98, description: 'ID del member en Crossref' })
  memberId!: number;

  @ApiProperty({ example: '1234', description: 'Password (igual para todos los members)' })
  password!: string;
}
