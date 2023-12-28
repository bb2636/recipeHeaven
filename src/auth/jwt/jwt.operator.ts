import { JwtInterface } from './jwt.interface';

export class JwtOperater {
  private operator: JwtInterface;

  async operate(data: any) {
    return this.operator.operate(data);
  }

  setOperator(operator: JwtInterface): void {
    this.operator = operator;
  }
}
