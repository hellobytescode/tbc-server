import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { UserStatusEnum, UserTypeEnum } from 'src/common/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'User' })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, reqiure: true, default: UserTypeEnum.STUDENT })
  userType: string;

  @Prop({ type: String, required: true, default: UserStatusEnum.PENDING })
  userStatus: string;

  @Prop({ type: Number, required: true, default: 0 })
  loginCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

//hash password before saving user
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified) {
      return next();
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
