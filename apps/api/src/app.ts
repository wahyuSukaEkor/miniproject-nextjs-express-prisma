import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { join } from 'path';
import { EventRouter } from './routers/event.router';
import { LocationRouter } from './routers/location.router';
import { CategoryRouter } from './routers/category.router';

import { VoucherRouter } from './routers/voucher.router';
import { ReviewRouter } from './routers/review.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const eventRouter = new EventRouter();
    const locationRouter = new LocationRouter();
    const categoryRouter = new CategoryRouter();
    const transactionRouter = new TransactionRouter();
    const voucherRouter = new VoucherRouter();
    const reviewRouter = new ReviewRouter();

    
    
    
    //serve image
    this.app.use('/', express.static(join(__dirname, '../public')));

    //events
    this.app.use('/events', eventRouter.getRoutes());
    
    //locations
    this.app.use('/locations', locationRouter.getRoutes());

    //categories
    this.app.use('/categories', categoryRouter.getRoutes());
    
    //transactions
    this.app.use('/transactions', transactionRouter.getRoutes());
    
    //voucer
    this.app.use('/vouchers', voucherRouter.getRoutes());

    //review
    this.app.use('/reviews', reviewRouter.getRoutes());


    //event orgainizer

    //user or particaipant attandee

    //auth


    //example
    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

  }


  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
