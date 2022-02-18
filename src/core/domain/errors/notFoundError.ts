import DomainError from './domainError';

export default class NotFoundError extends DomainError {
   constructor(data: string) {
      super(`${data} not found.`, 404);
      this.name = 'NotFoundError';
   }
}
