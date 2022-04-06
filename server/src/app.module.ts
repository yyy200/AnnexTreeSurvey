import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteController } from './route/route.controller';
import { RouteService } from './route/route.service';

@Module({
  imports: [],
  controllers: [AppController, RouteController],
  providers: [AppService, RouteService],
})
export class AppModule {}
