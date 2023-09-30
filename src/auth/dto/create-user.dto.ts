import { UserStatusEnum, UserTypeEnum } from 'src/common/enums';

export class CreateUserDto {
  name: string;
  password: string;
  email: string;
  userType: UserTypeEnum;
  userStatus: UserStatusEnum;
}
