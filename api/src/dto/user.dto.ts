import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'Admin User' })
  name!: string;

  @ApiProperty({ example: 'admin@example.com' })
  email!: string;
}
