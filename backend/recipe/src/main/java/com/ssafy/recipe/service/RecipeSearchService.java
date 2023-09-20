package com.ssafy.recipe.service;

import com.ssafy.recipe.api.request.RecipeSearchRequest;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.db.entity.Recipe;

import java.util.List;

public interface RecipeSearchService {

    List<RecipeSearchResponse> getSearchRecipe(RecipeSearchRequest request);

    void getRecipeSearchResponse(long memberId);
    public int getNeededIngredientsCnt(Recipe recipe);

    public int getMyIngredientCnt(Recipe recipe, int houseSeq);

    public MemberResponse getMember(Recipe recipe);

    boolean favoriteCheck(long memberId, int recipeId);

    List<HouseIngredientResponse> getHouseIngredientResponse(int houstSeq);
}
