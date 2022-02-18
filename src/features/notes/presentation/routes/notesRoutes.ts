import { Request, Response, Router } from 'express';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import CreateNoteUsecase from '../../domain/usecase/createNoteUsecase';
import DeleteNoteUsecase from '../../domain/usecase/deleteNoteUsecase';
import ListNotesUsecase from '../../domain/usecase/listNotesUsecase';
import UpdateNoteUsecase from '../../domain/usecase/updateNoteUsecase';
import NotesRepository from '../../infra/repositories/notesRepository';
import CreateNoteController from '../controllers/createNoteController';
import DeleteNoteController from '../controllers/deleteNoteController';
import ListNotesController from '../controllers/listNotesController';
import UpdateNoteController from '../controllers/updateNoteController';

export default class NotesRoutes {
   static initRouter(): Router {
      let router = Router();

      let notesRepo = new NotesRepository();
      let cacheRepo = new CacheRepository();

      let listUsecase = new ListNotesUsecase(notesRepo, cacheRepo);
      let createUsecase = new CreateNoteUsecase(notesRepo, cacheRepo);
      let updateUsecase = new UpdateNoteUsecase(notesRepo, cacheRepo);
      let deleteUsecase = new DeleteNoteUsecase(notesRepo, cacheRepo);

      let listNotesController = new ListNotesController(listUsecase);
      let createNoteController = new CreateNoteController(createUsecase);
      let updateNoteController = new UpdateNoteController(updateUsecase);
      let deleteNoteController = new DeleteNoteController(deleteUsecase);

      router.get('/:id', (req: Request, res: Response) => {
         listNotesController.execute(req, res);
      });
      router.post('/:id', (req: Request, res: Response) => {
         createNoteController.execute(req, res);
      });
      router.put('/:id/:userId', (req: Request, res: Response) => {
         updateNoteController.execute(req, res);
      });
      router.delete('/:id/:userId', (req: Request, res: Response) => {
         deleteNoteController.execute(req, res);
      });

      return router;
   }
}
