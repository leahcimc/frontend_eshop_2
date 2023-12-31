import axios from "axios";
import { TransactionDto, TransactionListDto } from "../data/dto/TransactionDto";
import * as FirebaseAuthService from "../firebase/FirebaseAuthService";
import getEnvConfig from "../config/EnvConfig";

const baseUrl = getEnvConfig().baseUrl;

export const createTransaction = async (): Promise<TransactionDto> => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.post(
            `${baseUrl}/transaction/prepare`,
            null,
            config
        );

        return response.data;
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const getTransaction = async (tid: string): Promise<TransactionDto> => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get<TransactionDto>(
            `${baseUrl}/transaction/${tid}`,
            config
        );

        return response.data;

    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const getAllTransaction = async (): Promise<TransactionListDto[]> => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get<TransactionListDto[]>(
            `${baseUrl}/transaction`,
            config
        );

        return response.data;

    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const payTransaction = async (tid: string) => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        await axios.patch(
            `${baseUrl}/transaction/${tid}/pay`,
            null,
            config
        );
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const finishTransaction = async (tid: string) => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        await axios.patch(
            `${baseUrl}/transaction/${tid}/finish`,
            null,
            config
        );
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}

export const deleteTransaction = async (tid: string) => {
    try {
        const accessToken = await FirebaseAuthService.getAccessToken();
        if (!accessToken) {
            throw new Error();
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        await axios.delete(
            `${baseUrl}/transaction/${tid}`,
            config
        );
        
    } catch (e) {
        console.error(e);
        throw e;
    }

}