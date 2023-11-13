import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'TEST';
  }

  getTestEndpoint(): object {
    return { id: 1, full_name: 'stole ristov' };
  }

}
