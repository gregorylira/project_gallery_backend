import { Router } from 'express';

import postRoute from './routes/posts.route';
import tagsRoute from './routes/tags.route';

export default () => {
  const app = Router();
  postRoute(app);
  tagsRoute(app);

  return app;
};
