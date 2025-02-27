import { Injectable } from '@nestjs/common';
import { compare, genSaltSync, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, genSaltSync(10));
  }

  async verifyHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
