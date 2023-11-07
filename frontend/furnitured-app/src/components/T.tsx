import {z} from "zod"

//GetFurnitures, FurnitureTypes
export const FurnitureScheme = 
    z.object({
      id: z.number(),
      type: z.string(),
      name: z.string(),
      price: z.number(),
      picture: z.string(),
      description: z.string(),
      material: z.array(z.string()),
      height: z.number(),
      width: z.number(),
      depth: z.number(),
      color: z.array(z.string()),
      luminosity: z.number(),
      availability: z.boolean(),
})

export type Furniture = z.infer<typeof FurnitureScheme>

//GetFurnitures
export type Response<Type> =
    | {
    data: Type
    status: number
    success: true
    }
    | {
    status: number
    success: false
}

//Contact
export type ContactField = {
    name:string
    contact:string
}

//FilterForTypes
export type Option = {
    opt: string,
    type: string,
    order: string
}

//Hamburger
export type Burger = {
    id: number,
    name: string,
    link: string,
}

//Livingroom
export type LivingroomFurniture = {
    status: boolean,
    type: string,
    content: string
}

//Loading
export type Advice = string

//Menu
export type Slide = {
    isImage: boolean;
    title: string;
    content: string;
}

//NewsLetter
export type Checkbox = {
    isClicked: boolean,
    name: string,
}

export const EmailSchema = z.string().email()

export type Email = z.infer<typeof EmailSchema>

export const AmountSchema = z.number().gt(1).or(z.null())

export type Amount = z.infer<typeof AmountSchema>
