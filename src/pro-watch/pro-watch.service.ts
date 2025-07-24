import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connector } from '../entities/connector.entity';
import { Repository } from 'typeorm';
import { Worker, isMainThread } from 'worker_threads';
import { join } from 'path';

@Injectable()
export class ProWatchService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(Connector, 'TireConnection')
    private connectorRepository: Repository<Connector>,
  ) {}
  private worker: Worker;
  private readonly logger = new Logger(ProWatchService.name);

  async startWorker() {
    if (isMainThread) {
      this.worker = new Worker(join(__dirname, './pro-watch.worker'));
      this.worker.on('message', (message) => {
        this.logger.log('Message from ProWatch Worker: ', message);
      });
      this.logger.debug(
        `starting ProWatch worker with process ID: ${this.worker.threadId}`,
      );
    }
  }

  async onModuleInit() {
    if (!(await this.connectorRepository.findOneBy({ name: 'ProWatch' }))) {
      await this.connectorRepository.insert({
        name: 'ProWatch',
        timestamp: new Date(0),
        active: false,
      });
    }
    this.startWorker();
  }

  async onModuleDestroy() {
    this.worker.terminate();
  }
}
