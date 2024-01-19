import express from "express"
import { z } from "zod"
import { load } from "../utils/db"
import { Request, Response } from 'express';


const router = express.Router()

const FurnitureScheme = z.object ({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    price: z.number(),
    picture: z.string(),
    description: z.string(),
    material: z.string().array(),
    height: z.number(),
    width: z.number(),
    depth: z.number(),
    color: z.string().array(),
    luminosity: z.number(),
    availability: z.boolean()
})
type Furniture = z.infer<typeof FurnitureScheme>

const FilterRequest = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    material: z.string().optional(),
    color: z.string().optional(),
    price: z.string().optional(),
    availability: z.string().optional(),
    luminosity: z.string().optional(),
    size: z.string().optional(),
})

router.get("/", async (req:Request, res:Response) => {

    const queryParseResult = FilterRequest.safeParse(req.query)
    if (!queryParseResult.success){
        console.log(queryParseResult.error)
        return res.sendStatus(400)
    }
        
    const query = queryParseResult.data
    
    const data = await load("furnitures")
    let db = z.object({ furnitures: FurnitureScheme.array() }).parse(data)

    
    let furnitures = db.furnitures.filter( (furniture:Furniture):boolean => {
    
        if (query.name){
           
            return furniture.name.includes(query.name)
        }else{
            return true
        }
    })

   furnitures = furnitures.filter( (furniture:Furniture):boolean => {
        if (query.type){
            return furniture.type.includes(query.type)
        }else{
            return true
        }
    })

    furnitures = furnitures.filter( (furniture:Furniture):boolean | Furniture[] => {
        let colors = furniture.color
        if (query.color) {
            let match = false
            let list: Furniture[] = []
            for (const color of colors) {
                if (color === query.color) {
                    match = true
                    list.push(...list, furniture)

                }
            }
            if(match){
                return list
            }else{
                return false
            }
           
        } else {
            return true
        }
        
    })

    furnitures = furnitures.filter( (furniture:Furniture):boolean => {
        let materials = furniture.material
            
        if (query.material) {
            for (const material of materials) {
              return material.includes(query.material)
            }
            return false

        } else {
            return true
        }
        
    })
 
    furnitures = furnitures.filter((furniture:Furniture):boolean | number => {

       if(query.minPrice && query.maxPrice){
        if(furniture.price > +query.minPrice && furniture.price <= +query.maxPrice){
            return furniture.price
        }else{
            return false
        }
       }else{
        return true
       }

    }) 

    furnitures = furnitures.filter( (furniture:Furniture):boolean => {
            
        if (query.availability){
            let availablity = query.availability === "true" ? true : false
            return availablity === furniture.availability
        }else{
            return true
        }
    })
   
    return res.json(furnitures)
})

router.get("/:id", async (req:Request, res:Response) => {
    req.params.id

    const data = await load("furnitures")

    let db = z.object({ furnitures: FurnitureScheme.array() }).parse(data)

    let furniture = db.furnitures.filter((furniture:Furniture):boolean => {
       return ""+furniture.id === req.params.id
    })

    return res.json(furniture)

})

export { router }