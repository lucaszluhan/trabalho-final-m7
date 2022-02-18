import DomainError from '../../../../core/domain/errors/domainError';

export default class UsuarioExiste extends DomainError {
   constructor(name: string) {
      super(`Usuário ${name} já existe.`, 403);
      this.name = 'Usuário já existe.';
   }
}
