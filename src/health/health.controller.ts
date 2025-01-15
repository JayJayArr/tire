import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    @InjectConnection('TireConnection')
    private tireConnection: Connection,
    @InjectConnection('ProWatchConnection')
    private proWatchConnection: Connection,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.db.pingCheck('tire-database', { connection: this.tireConnection }),
      () =>
        this.db.pingCheck('prowatch-database', {
          connection: this.proWatchConnection,
        }),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 5 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024),
    ]);
  }
}
