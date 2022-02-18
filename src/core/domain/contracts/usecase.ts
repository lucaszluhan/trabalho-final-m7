export default interface Usecase {
   run(data?: any): Promise<any>;
}
