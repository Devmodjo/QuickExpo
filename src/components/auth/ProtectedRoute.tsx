import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModal";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    if (showAuthModal) {
      // If not authenticated, we can either redirect to home or show the modal.
      // Showing modal while keeping the user on the same route might be tricky if the route itself renders content.
      // A better approach for a protected route wrapper is to redirect to landing with a state that triggers the modal,
      // OR render a "Access Denied" state with the modal open.

      // Let's redirect to home and open the modal there, passing 'from' state
      return (
        <Navigate to="/" state={{ from: location, openAuth: true }} replace />
      );
    }
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
