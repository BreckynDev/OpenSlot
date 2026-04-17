import { useState } from 'react';
import LoginFrom from './components/LoginForm';
import RegisterFrom from './components/RegisterForm';

type Page = 'login' | 'register' | 'dashboard';


function PrivateFlow() {
    const [page, setPage] = useState<Page>('login');
    const [user, setUserEmail] = useState<string>("");

    const handleLoginSuccess = (email: string) => {
        setUserEmail(email)
        setPage('dashboard');
    };

    const handleGoToRegister = () => {
        setPage('register');
    }

    const handleRegister = () => {
        setPage('login');
    }

    return (
        <>
            {page === 'login' && (
                <LoginFrom 
                    onContiune={handleLoginSuccess}
                    onGoToRegister={handleGoToRegister}
                />
            )}
            {page === 'register' && (
                <RegisterFrom
                    onRegister={handleRegister}
                />
            )}
        </>
    )
};

export default PrivateFlow;