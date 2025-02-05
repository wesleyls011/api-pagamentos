import bcrypt from 'bcrypt';

export class CriptografarSenha {
    // metodo que criptografa a senha
    public static async criptografarSenha(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(senha, salt);
    }

    // metodo que valida a senha
    public static async validarSenha(senha: string, senhaCriptografada: string): Promise<boolean> {
        return bcrypt.compare(senha, senhaCriptografada);
    }
}
