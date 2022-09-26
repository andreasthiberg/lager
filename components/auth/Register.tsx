import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation}:any) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {

            const result = await AuthModel.register(auth.email, auth.password);
            navigation.navigate("Login", { reload: true });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};