//redux auth .rejected
export interface ErrorPayload {
    error?: string;
    emailError?: string;
    passwordError?: string;
    usernameError?: string;
    errorLogin?: string;
    errorCodeEmail?: string;
}

//redux auth slice
export interface AuthState {
    emailError: string | null;
    passwordError: string | null;
    usernameError: string | null;
    error: string | null;
    errorLogin: string | null;
    errorCodeEmail: string | null;

    successCodeEmail: string | null;
    successResent: string | null;
    successLogout: string | null;
    success: string | null;
    successLogin: string | null;

    isLoading: boolean;
    user: any | null;
}