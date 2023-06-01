import {Record} from '../models/Record';
import { duckDuckGoUrl } from '../config';
import * as fs from 'fs';

class QueryController {
    async queryRecords(query: string, persist:boolean = false): Promise<Record[]> {
        try {
            const url = duckDuckGoUrl + query;
            const response: Response = await fetch(url);
            if (response.ok) {
              const jsonData = await response.json();
              const records: Record[] = this.convertDataToUIRecords(jsonData);
              if(persist) {
                this.persistQuery(query);
              }
              return records;
            } else {
              const errorText: string = await response.text();
              throw new Error(
                `API request failed with status ${response.status}: ${errorText}`
              );
            }
        }
        catch (error) {
          console.error("Error retrieving records:", error);
          throw error;
        }
    }

    convertDataToUIRecords(jsonData : any) {
      const records: Record[] = [];
      if (jsonData) {
        for (const relatedTopic of jsonData.RelatedTopics) {
          if (relatedTopic.Topics != null) {
            relatedTopic.Topics.forEach((topic: any) => {
              if (topic.FirstURL && topic.Text) {
                const record: Record = {
                  title: topic.Text,
                  url: topic.FirstURL,
                };
                records.push(record);
              }
            });
          } else {
            if (relatedTopic.FirstURL && relatedTopic.Text) {
              const record: Record = {
                title: relatedTopic.Text,
                url: relatedTopic.FirstURL,
              };
              records.push(record);
            }
          }
        }
      }
      return records;
    }

    persistQuery(query: string) {
      const filePath = 'queries.json';
      const contentToAdd = query + '\n';
      return fs.appendFile(filePath, contentToAdd, (err) => {
        if (err) {
          console.error('Error appending string to file:', err);
        } else {
          console.log('String appended to file successfully.');
        }
      });
    }

    getPastQueries(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        const filePath = 'queries.json';
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            return [];
          }
          const lines = data.split('\n');
          const nonEmptyLines = lines.filter(line => line.trim() !== "");
          resolve(nonEmptyLines);
        });
      });
    }
}
const queryController = new QueryController();
export default queryController;