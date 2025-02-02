declare namespace Express {
    export interface Request {
        body: {
            isPayeeLojista?: boolean;
            [key: string]: any; // Para permitir outras propriedades no corpo
        };
    }
}