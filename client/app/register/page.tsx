import AuthLayout from "@/app/layouts/auth-layout"
import RegistrationForm from "@/components/auth/registration-form";

export default function RegisterPage() {
    return (
        <AuthLayout>
            <RegistrationForm />
        </AuthLayout>
    )
}