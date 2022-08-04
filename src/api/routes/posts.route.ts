import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import Container from 'typedi';

import multerConfig from '../../config/multer';
import PostService from '../../service/Post.service';

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);

  const postServiceInstance = Container.get(PostService);

  route.post(
    '',
    multer(multerConfig).single('file'),
    (req: any, res: Response, next: NextFunction) => {
      postServiceInstance
        .createPost(req.file, req.body.tag)
        .then((post) => res.status(200).json(post))
        .catch((error) => {
          next(error);
        });
    }
  );

  route.get('', (req: Request, res: Response, next: NextFunction) => {
    postServiceInstance
      .getAllPosts(req.query)
      .then((post) => res.status(200).json(post))
      .catch((error) => {
        next(error);
      });
  });

  route.delete(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => {
      postServiceInstance
        .deletePost(req.params.id)
        .then((post) => res.status(200).json(post))
        .catch((error) => {
          next(error);
        });
    }
  );

  route.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => {
      postServiceInstance
        .findOnePost(req.params.id)
        .then((post) => res.status(200).json(post))
        .catch((error) => {
          next(error);
        });
    }
  );
};
