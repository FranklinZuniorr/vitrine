import { IUser } from "../interfaces/IUser"
import * as yup from 'yup';

export class UserEntity {

    static async validate({email, name, password, pix, socialNetwork}: IUser): Promise<IUser> {
        const userSchema = yup.object<IUser>().shape({
            email: yup.string().email("O email precisa estar no formato correto!").required("O email é obrigatório!"),
            name: yup.string().required("O nome é obrigatório!"),
            password: yup.string().required("A senha é obrigatória!"),
            pix: yup.string().required("A chave pix para recebimento é obrigatória!"),
            socialNetwork: yup.string()
        })

        const user = {
            email: email,
            name: name,
            password: password,
            pix: pix,
            socialNetwork: socialNetwork
        };

        try {
            const validatedData = userSchema.validateSync(user, {
              abortEarly: false, 
            });
          
            return validatedData;
        } catch (error: any) {
            const msgErrors = error.inner.map((e: any) => e.message);
            throw msgErrors;
        }
    }

}