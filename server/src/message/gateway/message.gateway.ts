import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from '../service/message.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { TypingStatusDto } from '../dto/typingStatus.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessage')
  async findAll(@MessageBody() messageInfo: any) {
    return await this.messageService.findAll(messageInfo);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody() typingStatusDto: TypingStatusDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('typing', {
      ...typingStatusDto,
    });

    setTimeout(() => {
      this.server.emit('typing', {
        ...typingStatusDto,
        isTyping: false,
      });
    }, 2000);
  }
}
