import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';


test('Login/register form should contain e-mail, password fields', async () => {
    const { getByText } = render(<AuthFields auth={{}} setAuth={() => (False)} title={"Logga in"} submit={() => (False)} />)

    const emailText = await getByText('E-post', { exact: false });
    const passwordText = await getByText('Lösenord', { exact: false });

    expect(emailText).toBeDefined();
    expect(passwordText).toBeDefined();
});
