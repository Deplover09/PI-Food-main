import {
  modelOptions,
  prop,
  type DocumentType,
  type Ref,
  type ReturnModelType
} from "@typegoose/typegoose";
import { Diet } from "./dietModel";
import { RecipeModel, DietModel } from "../models/exportModels";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Recipe {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  summary: string;

  @prop({ required: true })
  healthScore: number;

  @prop({ required: true })
  image: string;

  @prop({ required: true, type: () => [String] })
  steps: string[];

  @prop({ default: false })
  createdByUsers?: boolean;

  @prop({ ref: () => Diet })
  diets?: Array<Ref<typeof Diet>>;

  public static async findByName(
    this: ReturnModelType<typeof Recipe>,
    name: string
  ): Promise<DocumentType<Recipe> | null> {
    return await this.findOne({ name }).populate("diets").exec();
  }

  public static async createRecipe(
    this: ReturnModelType<typeof Recipe>,
    name: string,
    summary: string,
    healthScore: number,
    image: string,
    steps: string[],
    diets: Array<Ref<typeof Diet>>
  ): Promise<DocumentType<Recipe> | null> {
    const newRecipe = {
      name,
      summary,
      healthScore,
      image,
      steps,
      createdByUsers: true,
      diets
    };
    const savedRecipe = await new RecipeModel(newRecipe).save();
    if (savedRecipe.diets !== undefined) {
      await Promise.all(
        savedRecipe.diets.map(async (d) => {
          return await DietModel.findByIdAndUpdate(d, {
            recipes: savedRecipe._id
          });
        })
      );
      return savedRecipe;
    } else return null;
  }
}
