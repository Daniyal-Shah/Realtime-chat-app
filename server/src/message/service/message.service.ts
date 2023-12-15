import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message } from '../entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModal: Model<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messageModal.create(createMessageDto);
  }

  findAll(messageInfo: any) {
    return this.messageModal
      .find({
        $or: [
          {
            sender: messageInfo.sender,
            reciever: messageInfo.reciever,
          },
          { sender: messageInfo.reciever, reciever: messageInfo.sender },
        ],
      })
      .exec();
  }
}
