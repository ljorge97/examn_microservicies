import { Module } from '@nestjs/common';
import { PassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [PassangerController],
  providers: [PassangerService]
})
export class PassangerModule {}
