import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto } from './create-setting.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  readonly title: string;
  readonly logo: string;
  readonly ico: string;
  readonly keywords: string;
  readonly description: string;
  readonly companyName: string;
}
