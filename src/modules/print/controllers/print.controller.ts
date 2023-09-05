import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('print')
@Controller('print')
export class PrintController {
  @Get()
  public async getPrints() {
    return { hello: 'hello' };
  }
}
