class Recipe {
    id: number;
    title: string;
    image: string | undefined;
    isFavorite: boolean = false;
    isTried: boolean = false;
    rating: number | undefined;

    constructor(id: number, title: string, image: string, isFavorite: boolean, isTried: boolean, rating: number) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.isFavorite = isFavorite;
        this.isTried = isTried;
        this.rating = rating;
    }

    public static fromObject(recipeObject: {id: number; title: string; image: string; isFavorite: boolean | null; isTried: boolean | null; rating: number | null}) {
        return new Recipe(recipeObject.id, recipeObject.title, recipeObject.image, recipeObject.isFavorite ?? false, recipeObject.isTried ?? false, recipeObject.rating ?? -1);
    }

    public toObject(): object {
        return {
            id: this.id,
            title: this.title,
            image: this.image,
            isFavorite: this.isFavorite,
            isTried: this.isTried ?? false,
            rating: this.rating ?? null,
        };
    }
}

export default Recipe