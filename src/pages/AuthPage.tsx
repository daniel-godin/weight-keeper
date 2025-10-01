import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react"
import { auth } from "../services/firebase/firebase";
import { devError, devLog } from "../utils/logger";
import { useNavigate } from "react-router";


export function AuthPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setStatus("Signing In...");

            const result = await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password.trim());

            devLog(result);

            setStatus(`Welcome back, ${result.user.displayName}. Taking you to your home page now...`)

            setTimeout(() => {
                resetState();
                navigate('/app');
            }, 1000)

        } catch (error) {
            devError("Error in handleSubmit. Error: ", error);
            setStatus("Error signing in.  Please try again");
            setIsSubmitting(false);
        }
    }

    const resetState = () => {
        setFormData({ email: '', password: ''});
        setIsSubmitting(false);
        setStatus('');
    }

    return (
        <main>
            <header className="text-4xl font-bold">Sign In</header>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type="email"
                        name="email"
                        required={true}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                </label>

                <label>Password:
                    <input
                        type="password"
                        name="password"
                        required={true}
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                </label>

                <output>{status}</output>

                <button type="submit" disabled={isSubmitting}>Sign In</button>
            </form>
        </main>
    )
}