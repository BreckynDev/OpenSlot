import React from 'react';

interface LoginFormProps {
  onContinue: (email: string) => void;
  onGoToRegister: () => void;
}

const LoginForm = ({onContinue, onGoToRegister}: LoginFormProps) => {
  return (
    <div>
      <h1>Business Login</h1>
      {/* Form content */}
    </div>
  );
};

export default LoginForm;