import { RouteService } from './route.service';
import { Controller, Get } from '@nestjs/common';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  getRoute() {
    return this.routeService.getRoute();
  }
}
