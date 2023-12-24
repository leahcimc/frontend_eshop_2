import axios from "axios";
import { ProductDetail, ProductDto } from "../data/dto/ProductDto";

const baseUrl = 'http://localhost:8080';
// const baseUrl = 'http://ec2-52-221-215-76.ap-southeast-1.compute.amazonaws.com:8080';


export const getAllProduct = async (): Promise<ProductDto[]> => {
    // const response = await axios.get<ProductDto[]>("http://ec2-52-221-215-76.ap-southeast-1.compute.amazonaws.com:8080/public/product");
    try {
        const response = await axios.get<ProductDto[]>(`${baseUrl}/public/product`);
        return response.data;

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getOneProduct = async (pid: string): Promise<ProductDetail> => {
    // const response = await axios.get<ProductDto[]>("http://ec2-52-221-215-76.ap-southeast-1.compute.amazonaws.com:8080/public/product");
    try {
        const response = await axios.get<ProductDetail>(`${baseUrl}/public/product/${pid}`);
        return response.data;

    } catch (e) {
        console.log(e);
        throw e;
    }
}

