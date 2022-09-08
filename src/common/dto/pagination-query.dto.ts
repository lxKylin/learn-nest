// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // 标记为可选
  @IsOptional()
  // 检查，如果传入的是正数，则大于0
  @IsPositive()
  // 确保传入的值被解析为数字
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
