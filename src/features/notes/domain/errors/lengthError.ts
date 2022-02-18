import DomainError from '../../../../core/domain/errors/domainError';

export default class LengthError extends DomainError {
   constructor() {
      super('Maximum characters exceeded.');
      this.name = 'Length Error';
   }
}
