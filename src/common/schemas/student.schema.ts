import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { UserDocument } from './user.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: { type: Types.ObjectId, ref: 'user' },
  })
  userID: UserDocument;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'payment' }], default: [] })
  paymentID: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Courses' }] })
  selectedCourseIDs: Types.ObjectId[];

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: Date, default: Date.now })
  registrationDate: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
