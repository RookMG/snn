package com.ssafy.recipe.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private int recipeId;

    @Column(nullable = false, name="member_id")
    private Long memberId;

    @Column(name = "title", nullable = false, length = 32)
    private String title;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "youtube_url", length = 255)
    private String youtubeUrl;

    @Column(name = "favorite_count", nullable = false, columnDefinition = "int default 0")
    private int favoriteCount;

    @Column(name = "serving", nullable = false)
    private byte serving;

    @Column(name = "cooking_time", length = 10)
    private String cookingTime;

    @Column(name = "regist_datetime", nullable = false)
    private LocalDateTime registDatetime;

    @Column(name = "modify_datetime", nullable = false)
    private LocalDateTime modifyDatetime;

    @Column(name = "food_name", length = 10)
    private String foodName;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeIngredient> recipeIngredients;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeCustomIngredient> customIngredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeDetail> recipeDetails;

    @OneToMany(mappedBy = "recipe")
    private List<FavoriteRecipe> favoriteRecipes;

}
