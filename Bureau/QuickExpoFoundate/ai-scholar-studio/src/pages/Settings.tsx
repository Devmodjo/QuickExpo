import { motion } from "framer-motion";
import { PageLayout, fadeInUp, staggerContainer } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Moon,
  Globe,
  Bell,
  Download,
  Shield,
  Palette,
  User,
  Mail,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const settingsSections = [
    {
      title: "Apparence",
      icon: Palette,
      settings: [
        {
          id: "theme",
          label: "Thème",
          description: "Choisissez entre le mode clair et sombre",
          type: "theme-toggle",
        },
      ],
    },
    {
      title: "Langue",
      icon: Globe,
      settings: [
        {
          id: "language",
          label: "Langue de l'interface",
          description: "Sélectionnez votre langue préférée",
          type: "select",
          options: [
            { value: "fr", label: "Français" },
            { value: "en", label: "English" },
          ],
        },
        {
          id: "default-export-lang",
          label: "Langue par défaut des exposés",
          description: "Langue utilisée pour la génération",
          type: "select",
          options: [
            { value: "fr", label: "Français" },
            { value: "en", label: "English" },
          ],
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          id: "notifications",
          label: "Notifications push",
          description: "Recevoir des notifications de mise à jour",
          type: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
      ],
    },
    {
      title: "Export",
      icon: Download,
      settings: [
        {
          id: "auto-download",
          label: "Téléchargement automatique",
          description: "Télécharger automatiquement après génération",
          type: "toggle",
          value: autoDownload,
          onChange: setAutoDownload,
        },
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
              <span className="gradient-text">Paramètres</span>
            </h1>
            <p className="text-muted-foreground">
              Personnalisez votre expérience QuickExpo.
            </p>
          </motion.div>

          {/* User Card */}
          <motion.div variants={fadeInUp} className="mb-8">
            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  VM
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Victor Modjo</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    modjovictor5@gmail.com
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Plan Pro
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section, i) => (
              <motion.div
                key={section.title}
                variants={fadeInUp}
                custom={i}
              >
                <GlassCard className="overflow-hidden">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50 bg-muted/30">
                    <section.icon className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">{section.title}</h2>
                  </div>

                  {/* Settings */}
                  <div className="divide-y divide-border/50">
                    {section.settings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between px-6 py-4"
                      >
                        <div>
                          <Label className="text-base">{setting.label}</Label>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {setting.description}
                          </p>
                        </div>

                        {/* Theme Toggle */}
                        {setting.type === "theme-toggle" && (
                          <Button
                            variant="glass"
                            size="lg"
                            onClick={toggleTheme}
                            className="gap-3 min-w-[140px]"
                          >
                            {theme === "dark" ? (
                              <>
                                <Moon className="w-4 h-4" />
                                Sombre
                              </>
                            ) : (
                              <>
                                <Sun className="w-4 h-4" />
                                Clair
                              </>
                            )}
                          </Button>
                        )}

                        {/* Select */}
                        {setting.type === "select" && setting.options && (
                          <Select
                            value={language}
                            onValueChange={setLanguage}
                          >
                            <SelectTrigger className="w-[140px] bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              {setting.options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {/* Toggle */}
                        {setting.type === "toggle" && (
                          <Switch
                            checked={setting.value}
                            onCheckedChange={setting.onChange}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Security & Account */}
          <motion.div variants={fadeInUp} className="mt-6">
            <GlassCard className="overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50 bg-muted/30">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Compte & Sécurité</h2>
              </div>
              <div className="p-6 space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <User className="w-4 h-4" />
                  Modifier le profil
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Shield className="w-4 h-4" />
                  Changer le mot de passe
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                >
                  Supprimer mon compte
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Version */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>QuickExpo v1.0.0 • Powered by QWen AI</p>
            <p className="mt-1">Made with ❤️ in Yaoundé, Cameroun</p>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
