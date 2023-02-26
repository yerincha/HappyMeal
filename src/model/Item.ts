import { Timestamp } from 'firebase/firestore';

class Item {
  id: number;
  name: string | undefined;
  quantity: number = 0;
  expiredAt: Timestamp | null;

  constructor(
    id: number,
    name: string,
    quantity: number = 0,
    expiredAt: Timestamp | null
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.expiredAt = expiredAt;
  }

  public static fromObject(itemObj: {
    id: number;
    name: string;
    quantity: number | 0;
    expiredAt: Timestamp | null;
  }) {
    return new Item(
      itemObj.id,
      itemObj.name,
      itemObj.quantity ?? 0,
      itemObj.expiredAt
    );
  }

  public toObject(): object {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      expiredAt: this.expiredAt ?? null,
    };
  }
}

export default Item;
