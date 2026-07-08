// backend/src/main.ts (CORS 활성화 구성)
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.enableCors({
    origin: [
      "https://abluehour.croffledev.kr", // 통신을 허용할 프론트엔드 도메인 출처 명시
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});