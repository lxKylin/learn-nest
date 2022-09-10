import { Module } from '@nestjs/common';
import { UserRatingService } from './user-rating.service';
import { UserRatingController } from './user-rating.controller';
import { UserService } from '@/user/user.service';

@Module({
  imports: [UserService],
  controllers: [UserRatingController],
  providers: [UserRatingService]
})
export class UserRatingModule {}
