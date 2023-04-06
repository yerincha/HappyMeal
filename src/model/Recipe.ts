import { Timestamp } from "firebase/firestore";

class Recipe {
    id: number;
    title: string;
    image: string | undefined;
    isFavorite: boolean = false;
    isTried: boolean = false;
    rating: number | undefined;
    addedDateTime: Timestamp | undefined;

    constructor(id: number, title: string, image: string, isFavorite: boolean, isTried: boolean, rating: number, addedDateTime: Timestamp) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.isFavorite = isFavorite;
        this.isTried = isTried;
        this.rating = rating;
        this.addedDateTime = addedDateTime;
    }

    public static fromObject(recipeObject: {id: number; title: string; image: string; isFavorite: boolean | null; isTried: boolean | null; rating: number | null; addedDateTime: Timestamp | null;}) {
        return new Recipe(recipeObject.id, recipeObject.title, recipeObject.image, recipeObject.isFavorite ?? false, recipeObject.isTried ?? false, recipeObject.rating ?? -1, recipeObject.addedDateTime ?? Timestamp.now());
    }

    public toObject(): object {
        return {
            id: this.id,
            title: this.title,
            image: this.image,
            isFavorite: this.isFavorite,
            isTried: this.isTried ?? false,
            rating: this.rating ?? null,
            addedDateTime: this.addedDateTime ?? Timestamp.now(),
        };
    }
}

export default Recipe