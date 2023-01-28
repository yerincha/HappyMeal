import { QueryDocumentSnapshot } from "firebase/firestore";

class User {
    id: string | undefined;
    name: string | undefined;
    kidName: string | undefined;
    UID: string | undefined;
    email: string | undefined;

    public static fromFirestore(queryDocumentSnapshot: QueryDocumentSnapshot): User {
        const user = new User();
        user.id = queryDocumentSnapshot.id;
        user.name = queryDocumentSnapshot.data()["name"];
        user.kidName = queryDocumentSnapshot.data()["kidName"];
        user.UID = queryDocumentSnapshot.data()["UID"];
        return user;
    }

    public static init(name: string, kidName: string, UID: string, email: string): User {
        const user = new User();
        user.name = name;
        user.kidName = kidName;
        user.UID = UID;
        user.email= email;
        return user;
    }


    public toObject(): object {
        return {
            name: this.name,
            kidName: this.kidName,
            UID: this.UID
        };
    }
}

export default User