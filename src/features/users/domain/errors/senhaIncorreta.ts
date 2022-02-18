import DomainError from '../../../../core/domain/errors/domainError';

export default class senhaIncorreta extends DomainError {
   constructor() {
      super('Invalid password', 403);
      this.name = 'Password Error';
   }
}
