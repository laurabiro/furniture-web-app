import axios, { AxiosError, AxiosResponse } from "axios";
// TYPES:
import { FurnitureScheme } from "./T";
import { Furniture } from "./T";
import { Response } from "./T";

// BASE URL -------------------------------------------------------------------------------------------------------------------------
console.log(process.env.NODE_ENV)
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://furnitured-app8.onrender.com'
  : 'http://localhost:8000'

const client = axios.create({
  baseURL,
})

//GET -------------------------------------------------------------------------------------------------------------------------------
const getFurnitures = async (type?: string ): Promise<AxiosResponse | null> => {
  try {
    const params = type ? { type } : {} 
    const response = await client.get("/api/furnitures", { params })
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const getFilteredFurnitures = async (id?: string ): Promise<AxiosResponse | null> => {
  try { 
    const response = await client.get(`/api/furnitures/${id}`)
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

// VALIDATION ----------------------------------------------------------------------------------------------------------------------
export const validateFurnitures = (response: AxiosResponse): Furniture[] | null => {
  const result = FurnitureScheme.array().safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

export const validateFilteredFurnitures = (response: AxiosResponse): Furniture[] | null => {
  const result = FurnitureScheme.array().safeParse(response.data)

  if (!result.success) {
    return null
  }
  return result.data
}

//LOAD ------------------------------------------------------------------------------------------------------------------------------
export const loadFurnitures = async (
  type?: string
): Promise<Response<Furniture[]>> => {
  const response = await getFurnitures(type)
  if (!response) return { success: false, status: 0 }
  if (response.status !== 200)
    return { success: false, status: response.status }
  const data = validateFurnitures(response)
  if (!data) return { success: false, status: response.status }
  return { success: true, status: response.status, data }
}

export const loadFilteredFurnitures = async (
  id?: string
): Promise<Response<Furniture[]>> => {
  const response = await getFilteredFurnitures(id)
  if (!response) return { success: false, status: 0 }
  if (response.status !== 200)
    return { success: false, status: response.status }
  const data = validateFilteredFurnitures(response)
  if (!data) return { success: false, status: response.status }
  return { success: true, status: response.status, data }
}
