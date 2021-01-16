const Joi = require("joi")

const {findrecipes,findrecipesbyid,saverecipes,updateRecipe,deleteelementbyid} = require('../model/index')


const keywordsSchema = Joi.array().items(Joi.string().lowercase()).min(1).max(8)
const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(50).trim(),
  keywords: keywordsSchema,
  
})
const titleSchema = Joi.string().min(1).max(50).trim()


function validateRecipe(recipe) {
    const { error, value } = recipeSchema.validate(recipe)
    return { error, value }
}


function validateKeywords(keywords) {
    const { error, value } = keywordsSchema.validate(keywords)
    return { error, value }
}

function validatetitle(title) {
    const { error, value } = titleSchema.validate(title)
    return { error, value }
}


function getallrecipes() {
    return findrecipes()
}

function getbyid(id) {
    return findrecipesbyid(id)
}

function getbytitle(title) {
  const recipes = findrecipes()
  return recipes.filter(recipe => recipe.title.includes(title))
}


function getbykeywords(keywords) {
    const recipes = findrecipes()
    return recipes.filter(recipe => recipe.keywords.some(keyword=>keywords.includes(keyword)))
}

function createrecipes(recipe){
    return saverecipes(recipe)
}

function UpdateRecipe(id, fields) {
    return updateRecipe(id, fields)
}

function deletebyid(id) {
    return deleteelementbyid(id)
}

module.exports={
getallrecipes,
getbyid,
getbytitle,
getbyid,
getbykeywords,
UpdateRecipe,
createrecipes,
deletebyid,
validateKeywords,
validatetitle,
validateRecipe,
}