import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('conversations')
class Conversation {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  users_ids: string[];

  @CreateDateColumn()
  created_at: string;
}

export default Conversation;
