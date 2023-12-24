import axios from "axios";
import { CartDto } from "../data/dto/CartDto";
import * as FirebaseAuthService from "../firebase/FirebaseAuthService";

const baseUrl = 'http://localhost:8080';
// const baseUrl = 'http://ec2-52-221-215-76.ap-southeast-1.compute.amazonaws.com:8080';


export const putCartItem = async (pid: number, quantity: number) => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            config
        );
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const getCartItem = async (): Promise<CartDto[]> => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get<CartDto[]>(
            `${baseUrl}/cart`,
            config
        );

        return response.data;

    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const updateCartItem = async (pid: string, quantity: number): Promise<CartDto> => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.patch(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            config
        );

        return response.data;
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const deleteCartItem = async (pid: string) => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            config
        );
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}