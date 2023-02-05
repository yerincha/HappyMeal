import { QueryDocumentSnapshot } from "firebase/firestore";

class User {
    id: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    UID: string | undefined;
    email: string | undefined;

    public static fromFirestore(queryDocumentSnapshot: QueryDocumentSnapshot): User {
        const user = new User();
        user.id = queryDocumentSnapshot.id;
        user.firstname = queryDocumentSnapshot.data()["firstname"];
        user.lastname = queryDocumentSnapshot.data()["lastname"];
        user.UID = queryDocumentSnapshot.data()["UID"];
        return user;
    }

    public static init(firstname: string, lastname: string, UID: string, email: string): User {
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.UID = UID;
        user.email= email;
        return user;
    }


    public toObject(): object {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            UID: this.UID
        };
    }
}

export default User