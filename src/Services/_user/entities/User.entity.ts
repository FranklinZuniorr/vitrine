import { IUser } from "../interfaces/IUser"
import * as yup from 'yup';

export class UserEntity {

    static async validate({...user}: IUser): Promise<IUser> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const userSchema = yup.object<IUser>().shape({
            email: yup.string().email("O email precisa estar no formato correto!").required("O email é obrigatório!"),
            password: yup.string()
            .matches(passwordRegex, 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
            .required('O campo senha é obrigatório'),
            forgetPasswordKey: yup.string().required('Forget key password deve existir.'),
            store: yup.object().shape({
                name: yup.string().min(8, 'O nome da loja deve conte no mínimo 8 letras!').required('O nome da loja é obrigatório!'),
                photo: yup.string().required('A foto da loja é obrigatório!'),
            }).required('A configuração da loja é obrigatório!'),
            tickets: yup.number().required(),
        }).noUnknown(true, 'Campos adicionais não são permitidos!');

        try {
            const validatedData = userSchema.validateSync(user, {
              abortEarly: false, 
              stripUnknown: false,
            });
          
            return validatedData;
        } catch (error: any) {
            const msgErrors = error.inner.map((e: any) => e.message);
            throw msgErrors;
        }
    }

    static async validateEdit({...user}: Partial<IUser>): Promise<Partial<IUser>> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const userSchema = yup.object<Partial<IUser>>().shape({
            email: yup.string().email("O email precisa estar no formato correto!"),
            password: yup.string()
            .matches(passwordRegex, 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
            forgetPasswordKey: yup.string(),
            store: yup.object().shape({
                name: yup.string().min(8, 'O nome da loja deve conte no mínimo 8 letras!').required('O nome da loja é obrigatório!'),
                photo: yup.string().required('A foto da loja é obrigatório!'),
            })
        })

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

    static async validatePassword(password: string): Promise<string> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordSchema = yup.string()
        .matches(passwordRegex, 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
        .required('O campo senha é obrigatório');

        try {
            const validatedData = passwordSchema.validateSync(password, {
              abortEarly: false, 
            });
          
            return validatedData;
        } catch (error: any) {
            const msgErrors = error.inner.map((e: any) => e.message);
            throw msgErrors;
        }
    }

}