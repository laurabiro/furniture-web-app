import axios, { AxiosError, AxiosResponse } from "axios";
// TYPES:
import { FurnitureScheme } from "./T";
import { Furniture } from "./T";
import { Response } from "./T";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

const getFurnitures = async (type?: string): Promise<AxiosResponse | null> => {
  try {
    const params = type ? { type } : {}
    const response = await client.get("/api/furnitures", { params })
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

export const validateFurnitures = (response: AxiosResponse): Furniture | null => {
  const result = FurnitureScheme.safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

export const loadFurnitures = async (
  type?: string
): Promise<Response<Furniture>> => {
  const response = await getFurnitures(type)
  if (!response) return { success: false, status: 0 }
  if (response.status !== 200)
    return { success: false, status: response.status }
  const data = validateFurnitures(response)
  if (!data) return { success: false, status: response.status }
  return { success: true, status: response.status, data }
}
