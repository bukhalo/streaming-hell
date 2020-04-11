import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class VkService {
  constructor(private readonly httpService: HttpService) {}
}
