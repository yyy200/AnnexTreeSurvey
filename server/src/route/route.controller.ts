import { RouteService } from './route.service';
import { Controller, Post } from '@nestjs/common';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  getRoute() {
    return this.routeService.getRoute();
  }
}
