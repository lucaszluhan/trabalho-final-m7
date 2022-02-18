import express from 'express';
import NotesRoutes from '../../../features/notes/presentation/routes/notesRoutes';
import UsersRoutes from '../../../features/users/presentation/routes/usersRoutes';

export const makeRoutes = (app: express.Application) => {
   app.use('/users', UsersRoutes.initRoutes());
   app.use('/notes', NotesRoutes.initRouter());
};
