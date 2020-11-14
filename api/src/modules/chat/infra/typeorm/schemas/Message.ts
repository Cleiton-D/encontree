import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('messages')
class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  conversation_id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column('uuid')
  sender_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Message;
