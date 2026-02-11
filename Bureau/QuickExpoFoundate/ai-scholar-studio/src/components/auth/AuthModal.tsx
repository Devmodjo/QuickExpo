import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Github, Facebook, Linkedin, Mail, Chrome } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login } = useAuth();

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    login(provider);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-none text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            {activeTab === "login" ? "Bon retour" : "Rejoignez-nous"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login"
              ? "Accédez à votre espace QuickExpo"
              : "Créez votre compte pour commencer"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="w-full h-12 text-lg relative hover:bg-muted/50 transition-all"
            >
              <Chrome className="mr-3 h-5 w-5" />
              Continuer avec Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="w-full h-12 text-lg relative hover:bg-muted/50 transition-all"
            >
              <Github className="mr-3 h-5 w-5" />
              Continuer avec Github
            </Button>

            <div className="relative group">
              <Button
                variant="outline"
                disabled
                className="w-full h-12 text-lg opacity-70 cursor-not-allowed"
              >
                <Linkedin className="mr-3 h-5 w-5" />
                LinkedIn
              </Button>
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                Bientôt
              </div>
            </div>

            <div className="relative group">
              <Button
                variant="outline"
                disabled
                className="w-full h-12 text-lg opacity-70 cursor-not-allowed"
              >
                <Facebook className="mr-3 h-5 w-5" />
                Facebook
              </Button>
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                Bientôt
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-primary">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="underline hover:text-primary">
              Politique de confidentialité
            </a>
            .
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
