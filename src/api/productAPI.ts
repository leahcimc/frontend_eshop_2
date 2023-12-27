import getEnvConfig from "../config/EnvConfig";
import axios from "axios";
import { ProductDetail, ProductDto } from "../data/dto/ProductDto";

const baseUrl = getEnvConfig().baseUrl;


export const getAllProduct = async (): Promise<ProductDto[]> => {
    try {
        const response = await axios.get<ProductDto[]>(`${baseUrl}/public/product`);
        return response.data;

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getOneProduct = async (pid: string): Promise<ProductDetail> => {
    try {
        const response = await axios.get<ProductDetail>(`${baseUrl}/public/product/${pid}`);
        return response.data;

    } catch (e) {
        console.log(e);
        throw e;
    }
}

