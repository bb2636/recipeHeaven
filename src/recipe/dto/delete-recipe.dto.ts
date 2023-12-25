import { User } from 'src/auth/user.entity';

export class DeleteRecipeDto {
  user: User;
  recipeId: number;

  constructor(deleteRecipeDto: { recipeId: number; user: User }) {
    const { user, recipeId } = deleteRecipeDto;
    this.user = user;
    this.recipeId = recipeId;
  }
}
