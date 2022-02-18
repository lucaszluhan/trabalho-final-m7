import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import INotes from '../../../../features/notes/domain/model/notesInterface';
import Users from './users';

@Entity({ name: 'notes_m5', schema: 'trabalho_final_m5' })
export default class Notes implements INotes {
   @PrimaryColumn({
      type: 'uuid',
   })
   uid: string;

   @Column({
      length: 50,
   })
   description: string;

   @Column({
      length: 500,
   })
   detail: string;

   @ManyToOne(() => Users, (user) => user.uid, {
      // eager: true,
   })
   user_uid: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
