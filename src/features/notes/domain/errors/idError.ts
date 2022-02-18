import DomainError from '../../../../core/domain/errors/domainError';

export default class IdError extends DomainError {
   constructor() {
      super('Invalid ID');
      this.name = 'ID Error';
   }
}
