import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from './user.schema';

@Schema()
export class Course {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'user' }], required: true })
  instructor: UserDocument;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Number, required: true })
  durationInWeeks: number;

  // Additional fields for a course
  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  enrolledStudentIDs: string[];

  // ...Add more fields as per your requirements
}

export const CourseSchema = SchemaFactory.createForClass(Course);
