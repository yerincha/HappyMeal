import { db } from '../firebase';
import User from '../model/User';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"; 

class APIService {
    private static instance: APIService;

    public static getInstance(): APIService {
        if (!APIService.instance) {
            APIService.instance = new APIService();
        }

        return APIService.instance;
    }

    // User API
    public getUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            let users: User[] = [];

            getDocs(collection(db, "users"))
                .then((result) => {
                    result.forEach((doc) => {
                        const user = User.fromFirestore(doc);
                        users.push(user);
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    resolve(users);
                });
        });
    };
    
    public addUser(user: User) {
        addDoc(collection(db, "users"), user.toObject())
    };

    public getUserByUID(UID: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve, reject) => {
            let user: User | undefined;
            getDocs(query(collection(db, "users"), where("UID", "==", UID)))
                .then((result) => {
                    result.forEach((doc) => {
                        user = User.fromFirestore(doc);
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally (() => {
                    resolve(user);
                });
        });
    }
}

export default APIService;
