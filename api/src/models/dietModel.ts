import {
  modelOptions,
  prop,
  type Ref,
  type ReturnModelType
} from "@typegoose/typegoose";
import { Recipe } from "./recipeModel";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Diet {
  @prop({ required: true })
  name: string;

  @prop({ ref: () => Recipe })
  recipes?: Array<Ref<typeof Recipe>> | null;

  public static async findByName(
    this: ReturnModelType<typeof Diet>,
    name: string
  ): Promise<Diet | null> {
    return await this.findOne({ name });
  }
}
