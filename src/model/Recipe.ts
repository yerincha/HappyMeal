class Recipe {
    id: number;
    title: string;
    image: string | undefined;
    isFavorite: boolean = false;

    constructor(id: number, title: string, image: string, isFavorite: boolean) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.isFavorite = isFavorite;
    }

    public static fromObject(recipeObject: {id: number; title: string; image: string; isFavorite: boolean | null}) {
        return new Recipe(recipeObject.id, recipeObject.title, recipeObject.image, recipeObject.isFavorite ?? false);
    }

    public toObject(): object {
        return {
            id: this.id,
            title: this.title,
            image: this.image,
            isFavorite: this.isFavorite
        };
    }
}

export default Recipe