import { IUser } from "../interfaces/IUser"
import * as yup from 'yup';

export class UserEntity {

    static async validate({email, password}: IUser): Promise<IUser> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const userSchema = yup.object<IUser>().shape({
            email: yup.string().email("O email precisa estar no formato correto!").required("O email é obrigatório!"),
            password: yup.string()
            .matches(passwordRegex, 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
            .required('O campo senha é obrigatório')
        })

        const user = {
            email: email,
            password: password,
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