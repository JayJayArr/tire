import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Reader } from 'src/entities/reader.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReaderService {
  constructor(
    @InjectRepository(Reader, 'TireConnection')
    private readerRepository: Repository<Reader>,
  ) { }

  @InjectEntityManager('ProWatchConnection')
  private pwEntityManager: EntityManager;
  async getReaders(): Promise<Reader[] | undefined> {
    return this.readerRepository.find();
  }

  async putReader(reader: Reader): Promise<Reader | undefined> {
    return this.readerRepository.save(reader);
  }

  async pullFromProWatch(): Promise<number | undefined> {
    return new Promise(async (resolve, reject) => {
      let querystring = `select DISTINCT LOGICAL_DEV.id, DESCRP, INSTALLED
        from LOGICAL_DEV
        inner join LOGICAL_DEV_D on LOGICAL_DEV.id = LOGICAL_DEV_D.id
        where HARDWARE_TYPE = '8'`;
      await this.pwEntityManager
        .query(querystring)
        .then(async (response) => {
          response.forEach(async (reader) => {
            let createReader = {
              id: reader.id,
              name: reader.DESCRP.toString(),
            };
            this.readerRepository.save(createReader);
          });
          resolve(response.length);
        })
        .catch((err) => reject(err));
    });
  }
}
