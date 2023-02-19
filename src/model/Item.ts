import { Timestamp } from "firebase/firestore";

class Item {
    name: string | undefined;
    quantity: number = 0;
    expiredAt: Timestamp | null;

    constructor(name: string, quantity: number = 0, expiredAt: Timestamp | null) {
        this.name = name;
        this.quantity = quantity;
        this.expiredAt = expiredAt;
    }

    public static fromObject(itemObj: {name: string; quantity: number | 0; expiredAt: Timestamp | null}) {
        return new Item(itemObj.name, itemObj.quantity ?? 0, itemObj.expiredAt);
    }

    public toObject(): object {
        return {
            name: this.name,
            quantity: this.quantity,
            expiredAt: this.expiredAt ?? null,
        };
    }
}

export default Item