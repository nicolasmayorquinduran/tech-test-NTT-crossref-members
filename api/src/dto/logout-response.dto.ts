import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty({ example: true, description: 'Indica si el logout fue exitoso' })
  ok: boolean;

  @ApiProperty({ example: 'Sesión cerrada exitosamente', description: 'Mensaje de confirmación' })
  message: string;
}
