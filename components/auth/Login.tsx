import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Login({navigation, setIsLoggedIn}:any) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {

            const result = await AuthModel.login(auth.email, auth.password);
            if("errors" in result){
                if(result.errors.title === "User not found"){
                    showMessage({
                        message: "Inloggning misslyckad",
                        description: "Användaren finns inte",
                        type: "danger",
                    });
                } else {
                    showMessage({
                        message: "Inloggning misslyckad",
                        description: "Fel lösenord",
                        type: "danger",
                    });
                }
            }
            else {
                setIsLoggedIn(true);
                showMessage({
                    message: "Inloggad",
                    description: "Du är nu inloggad",
                    type: "success",
                });
            }
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};