import { Body, Controller, Post, UnauthorizedException, Res, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { MemberDto } from './dto/member.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@ApiTags('auth')
@ApiExtraModels(LoginResponseDto, MemberDto, LogoutResponseDto)
@Controller()
export class LoginController {
  private readonly CROSSREF_API_URL = 'https://api.crossref.org';
  private readonly VALID_PASSWORD = '1234';
  @Post('login')
  @ApiOperation({ summary: 'Login con Crossref Member ID' })
  @ApiCookieAuth('auth_token')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login correcto. Devuelve cookie HttpOnly con token y datos del member.',
    schema: { $ref: getSchemaPath(LoginResponseDto) }
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas o member no encontrado' })
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<LoginResponseDto> {
    const { memberId, password } = body ?? {} as LoginDto;

    if (password !== this.VALID_PASSWORD) {
      throw new UnauthorizedException('Password inválido');
    }

    const member = await this.validateMember(memberId);
    if (!member) {
      throw new NotFoundException(`Member con ID ${memberId} no encontrado en Crossref`);
    }

    const token = `token-member-${memberId}-${Date.now()}`;

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    return { ok: true, member };
  }

  /**
   * Validates that the member exists in Crossref and returns its data.
   */
  private async validateMember(memberId: number): Promise<MemberDto | null> {
    try {
      const response = await fetch(`${this.CROSSREF_API_URL}/members/${memberId}`);
      
      if (!response.ok) {
        console.error(`Crossref API error: ${response.status}`);
        return null;
      }

      const data = await response.json();
      const memberData = data.message;

      const member: MemberDto = {
        id: memberData.id,
        'primary-name': memberData['primary-name'],
        location: memberData.location,
        prefixes: memberData.prefixes || [],
        counts: {
          'total-dois': memberData.counts?.['total-dois'] || 0,
          'current-dois': memberData.counts?.['current-dois'] || 0
        }
      };

      return member;
    } catch (error) {
      console.error('Error validating member with Crossref:', error);
      return null;
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión y eliminar cookie de autenticación' })
  @ApiOkResponse({
    description: 'Sesión cerrada exitosamente. Cookie eliminada.',
    schema: { $ref: getSchemaPath(LogoutResponseDto) }
  })
  logout(@Res({ passthrough: true }) res: Response): LogoutResponseDto {
    res.clearCookie('auth_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return { ok: true, message: 'Sesión cerrada exitosamente' };
  }
}
