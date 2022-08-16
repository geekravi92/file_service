import { Injectable } from '@nestjs/common';
import { readFile, utils } from "xlsx";
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) { }

  processFile(filepath: string): void {
    // Read file from a specified path
    const data = this.readFile(filepath);

    // Populate the same into Kafka
    this.pushToKafka(data);
  }

  private readFile(filepath: string): object {
    const workbook = readFile(filepath);
    const data = workbook.SheetNames.reduce((obj, cur): any => {
      obj[cur] = utils.sheet_to_json(workbook.Sheets[cur]);
      return obj;
    }, {});
    return data;
  }

  private pushToKafka(data: object): void {
    Object.keys(data).forEach(topic => {
      const topicPayload: [object] = data[topic];
      topicPayload.forEach(payload => {
        this.producerService.produce({
          topic,
          messages: [{ value: JSON.stringify(payload) }]
        });
      });
    })
  }
}
