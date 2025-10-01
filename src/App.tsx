import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./pages/LandingPage";
import { AppLayout } from "./layouts/AppLayout";
import { AuthPage } from "./pages/AuthPage";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Catch-all Redirect */}
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </BrowserRouter>
    )
}

function ProtectedRoute () {
    const { authState } = useAuth();

    if (authState.loading) { return <>Loading...</> }; // TODO: Replace with proper loading component.
    if (!authState.user) { return <Navigate to="/auth" replace /> }; // Auth Guard Clause.

    // Add a DataProvider here later.
    return (
        <AppLayout />
    )
}

function NotFoundRedirect() {
    const { authState } = useAuth();

    // If Logged In. Send to App page.
    if (authState.user) { return <Navigate to="/app" replace /> };

    // If not logged in, send to landing page
    return <Navigate to="/" replace />
}