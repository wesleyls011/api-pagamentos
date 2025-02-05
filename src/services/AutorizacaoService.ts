import axios from 'axios';

export async function autorizarTransferencia(): Promise<boolean>{
    try{
        const response = await axios.get("https://util.devi.tools/api/v2/authorize");

        return response.data?.data?.authorization === true;
    } catch (error){
        console.error("erro ao autorizar transferencia", error);
        return false;
    }
}