import { useState, type FormEvent } from "react"


export function AuthPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log("handle submit triggered");
    }

    return (
        <main>
            <header>Sign In</header>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type="email"
                        name="email"
                        required={true}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>

                <label>Password:
                    <input
                        type="password"
                        name="password"
                        required={true}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
            </form>
        </main>
    )
}