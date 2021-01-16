const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/recipes.json')
const databases = low(adapter)

// nuestra base de datos con lowdb sera por defecto un array de tareas vacio

databases.defaults(
    { 
        recipes: []
    }).write();

    

function findrecipes(filter = {}) {
    
    return databases.get('recipes').filter(filter).value()
}

function findrecipesbyid(id) {
    return databases.get('recipes').find({id:Number(id)}).value()
}


function saverecipes(recipe){
    
    const countrecipes = databases.get('recipes').size().value()
    const newrecipe= {
        id:countrecipes+1,
        ...recipe,
    }
    databases.get('recipes').push(newrecipe).write()
    return newrecipe
}

function updateRecipe(id, fields) {
    console.log(fields)
    
    const recipe = databases.get('recipes').find({ id }).value()
    const newRecipe = {
      ...recipe,
      ...fields,
    }
    databases.get('recipes').find({ id }).assign(newRecipe).write()
    return newRecipe
}


function deleteelementbyid(id) {
    databases.get('recipes').remove({id:Number(id)}).write()
}

module.exports = {
    findrecipes,
    findrecipesbyid,
    saverecipes,
    updateRecipe,
    deleteelementbyid,
}