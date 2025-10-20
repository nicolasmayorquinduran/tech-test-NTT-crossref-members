import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDto } from './dto/user.dto';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Simple Auth API with hardcoded login')
    .setVersion('1.0.0')
    .addCookieAuth('auth_token', {
      type: 'http',
      in: 'cookie',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'HttpOnly auth token'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [LoginResponseDto, UserDto]
  });
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API running at http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger UI at http://localhost:${port}/docs`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
