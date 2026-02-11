import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Zap, Sun, Moon, LogIn } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-4">
          <div className="glass-card rounded-2xl px-6 py-3 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-xl font-bold font-display">
                  Quick<span className="text-primary">Expo</span>
                </span>
              </Link>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-xl hover:bg-muted"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </Button>

                {/* Auth Button */}
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden md:inline">
                      {user.name}
                    </span>
                    <Button
                      onClick={logout}
                      className="rounded-xl"
                      size="sm"
                      variant="ghost"
                    >
                      <LogIn className="w-4 h-4 md:mr-2 rotate-180" />
                      <span className="hidden md:inline">Déconnexion</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="rounded-xl"
                    size="sm"
                  >
                    <LogIn className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">
                      S'inscrire / Se connecter
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
