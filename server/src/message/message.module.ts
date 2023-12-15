import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageGateway } from './gateway/message.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
