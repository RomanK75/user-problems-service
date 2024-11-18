import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class SeedUsers1731933970317 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      const batchSize = 10000;
      const totalUsers = 1000000;
  
      for (let i = 0; i < totalUsers; i += batchSize) {
        const values = Array.from({ length: batchSize }, () => {
          return `('${faker.person.firstName().replace(/'/g, "''")}','${faker.person.lastName().replace(/'/g, "''")}',${faker.number.int({ min: 18, max: 80 })},'${faker.helpers.arrayElement(['M', 'F'])}',${faker.datatype.boolean()})`;
        }).join(',');
  
        await queryRunner.query(
          `INSERT INTO users ("firstName", "lastName", "age", "gender", "hasProblems") VALUES ${values}`
        );
      }
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('TRUNCATE TABLE users');
    }
  }
  