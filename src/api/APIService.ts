import { db } from '../firebase';
import User from '../model/User';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  Timestamp,
  DocumentReference,
} from 'firebase/firestore';
import Item from '../model/Item';
import Recipe from '../model/Recipe';

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

      getDocs(collection(db, 'users'))
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
  }

  public addUser(user: User) {
    addDoc(collection(db, 'users'), user.toObject());
  }

  public getUserByUID(UID: string): Promise<User | undefined> {
    return new Promise<User | undefined>((resolve, reject) => {
      let user: User | undefined;
      getDocs(query(collection(db, 'users'), where('UID', '==', UID)))
        .then((result) => {
          result.forEach((doc) => {
            user = User.fromFirestore(doc);
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          resolve(user);
        });
    });
  }

  // Fridge
  public setFridge(userId: string, items: Item[]): Promise<void> {
    let itemObjArr: object[] = [];

    items.forEach((item) => {
      itemObjArr.push(item.toObject());
    });
    return setDoc(doc(db, 'fridge', userId), {
      items: itemObjArr,
    });
  }

  public getFridgeItems(userId: string): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      let items: Item[] = [];

      getDoc(doc(db, 'fridge', userId))
        .then((result) => {
          if (result.data()) {
            result
              .data()!!
              ['items'].forEach(
                (item: {
                  id: number;
                  name: string;
                  quantity: number | 0;
                  expiredAt: Timestamp | null;
                }) => {
                  items.push(Item.fromObject(item));
                }
              );
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          resolve(items);
        });
    });
  }

  // Recipe
  public getMyRecipes(userId: string): Promise<Recipe[]> {
    return new Promise<Recipe[]>((resolve, reject) => {
      let recipeArray: Recipe[] = [];

      getDoc(doc(db, 'recipe', userId))
        .then((result) => {
          if (result.data()) {
            result
              .data()!!
              ['list'].forEach(
                (recipe: {
                  id: number;
                  title: string;
                  image: string;
                  isFavorite: boolean;
                  isTried: boolean;
                  rating: number;
                }) => {
                  recipeArray.push(Recipe.fromObject(recipe));
                }
              );
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          resolve(recipeArray);
        });
    });
  }

  public setMyRecipes(userId: string, recipeArray: Recipe[]): Promise<void> {
    console.log(recipeArray);

    let recipeObjectArray: object[] = [];

    recipeArray.forEach((recipe) => {
      recipeObjectArray.push(recipe.toObject());
    });

    return setDoc(doc(db, 'recipe', userId), {
      list: recipeObjectArray,
    });
  }
}

export default APIService;
