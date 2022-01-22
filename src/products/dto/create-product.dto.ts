export class CreateProductDto {
  picture?: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly category: any;
}
