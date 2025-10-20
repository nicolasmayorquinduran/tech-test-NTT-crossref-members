import { ApiProperty } from '@nestjs/swagger';
import { MemberDto } from './member.dto';

export class LoginResponseDto {
  @ApiProperty({ example: true })
  ok!: boolean;

  @ApiProperty({ type: () => MemberDto })
  member!: MemberDto;
}
