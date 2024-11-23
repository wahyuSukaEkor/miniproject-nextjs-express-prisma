import { LocationController } from '@/controllers/location.controller';
import { Router } from 'express';

export class LocationRouter {
  private router: Router;
  private locationController: LocationController;

  constructor() {
    this.router = Router();
    this.locationController = new LocationController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.locationController.getLocations);
  }

  public getRoutes(): Router {
    return this.router;
  }
}
