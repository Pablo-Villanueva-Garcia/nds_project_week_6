
const {Router} = require ('express');
const router  = Router ();

const {getallrecipes,getbyid,getbytitle,getbykeywords,UpdateRecipe,createrecipes,deletebyid,validateKeywords ,validatetitle,validateRecipe} = require('../services/index');



router.get("/", (req, res) => {


    if (req.query.keywords) {
        const keywords = req.query.keywords.split(",")
        const { error, value } = validateKeywords(keywords)
        if (error) {
        res.status(400).json({ error: error.message })
        return
        }
        const recipes = getbykeywords(value)   
        res.status(200).json(recipes)
        return
    }
 
    if (req.query.title) {
        const title = req.query.title
        const { error, value } = validatetitle(title)
        if (error) {
        res.status(400).json({ error: error.message })
        return
        }
        const recipes = getbytitle(value) 
        res.status(200).json(recipes)
        return
    }
    

    const recipes = getallrecipes()
    res.status(200).json(recipes)
    return
    
})



router.get('/:id',(req,res)=>{
   
    const recipesbyid = getbyid(req.params.id)
    res.status(200).json(recipesbyid)
   
});


router.post('/',(req,res)=>{
    const { error, value } = validateRecipe(req.body)
    if (error) {
        res.status(400).json({ error: error.message })
        return
        }
    const recipe = createrecipes(value)
    res.status(201).json(recipe)
});


router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const recipe = UpdateRecipe(id, req.body)
    res.status(201).json(recipe)
});


router.delete("/:id",(req,res)=>{
    deletebyid(req.params.id)
    res.status(204).end();
});


module.exports=router;