import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty({ example: 98, description: 'ID único del member en Crossref' })
  id!: number;

  @ApiProperty({ example: 'Cambridge University Press' })
  'primary-name'!: string;

  @ApiProperty({ example: 'Cambridge, United Kingdom', required: false })
  location?: string;

  @ApiProperty({ example: ['10.1017'], type: [String] })
  prefixes!: string[];

  @ApiProperty({ 
    example: { 'total-dois': 500000, 'current-dois': 450000 },
    description: 'Estadísticas de DOIs del member'
  })
  counts!: {
    'total-dois': number;
    'current-dois': number;
  };
}
