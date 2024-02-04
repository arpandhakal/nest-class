import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Class Api Documentation')
    .setDescription(`no description`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 3,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.use(helmet());
  await app.listen(3000);
}

bootstrap();
