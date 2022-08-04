import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';

import TagsService from '../../service/Tags.service';

const route = Router();

export default (app: Router) => {
  app.use('/tags', route);

  const tagServiceInstance = Container.get(TagsService);

  route.get('', (req: Request, res: Response, next: NextFunction) => {
    tagServiceInstance
      .findAll()
      .then((tag) => res.status(200).json(tag))
      .catch((error) => {
        next(error);
      });
  });

  route.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    tagServiceInstance
      .changeTags(req.params.id, req.body)
      .then((tag) => res.status(200).json(tag))
      .catch((error) => {
        next(error);
      });
  });
};
