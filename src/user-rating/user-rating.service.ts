import { Injectable } from '@nestjs/common';
// import { CreateUserRatingDto } from './dto/create-user-rating.dto';
// import { UpdateUserRatingDto } from './dto/update-user-rating.dto';

import { UserService } from '@/user/user.service';

@Injectable()
export class UserRatingService {
  constructor(private readonly userService: UserService) {}
}
