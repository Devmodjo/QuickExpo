import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  PageLayout,
  fadeInUp,
  staggerContainer,
} from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AILoader } from "@/components/ui/ai-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  GraduationCap,
  Globe,
  FileText,
  Sparkles,
  ArrowRight,
  Lightbulb,
  BookOpen,
  School,
  Landmark,
  Briefcase,
} from "lucide-react";

const schoolLevels = [
  { value: "primaire", label: "Primaire", icon: BookOpen },
  { value: "college", label: "Collège", icon: School },
  { value: "lycee", label: "Lycée", icon: GraduationCap },
  { value: "universite", label: "Université", icon: Landmark },
  { value: "professionnel", label: "Professionnel", icon: Briefcase },
];

const languages = [
  { value: "fr", label: "Français", code: "FR" },
  { value: "en", label: "English", code: "EN" },
];

const lengths = [
  { value: "court", label: "Court", description: "1-2 pages" },
  { value: "moyen", label: "Moyen", description: "3-5 pages" },
  { value: "long", label: "Long", description: "6-10 pages" },
];

const suggestedTopics = [
  "Le réchauffement climatique",
  "La révolution française",
  "L'intelligence artificielle",
  "Les énergies renouvelables",
  "La biodiversité marine",
];

export default function Generator() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("fr");
  const [length, setLength] = useState("moyen");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim() || !level) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Navigate to preview with generated content
    navigate("/preview", {
      state: {
        subject,
        level,
        language,
        length,
        generatedAt: new Date().toISOString(),
      },
    });
  };

  const canGenerate = subject.trim().length > 3 && level;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="min-h-[60vh] flex flex-col items-center justify-center"
            >
              <AILoader size="lg" text="Génération en cours..." />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 max-w-md text-center"
              >
                <p className="text-muted-foreground mb-4">
                  Notre IA analyse votre sujet et structure votre exposé...
                </p>
                <div className="space-y-2">
                  {[
                    "Recherche des informations",
                    "Structuration du plan",
                    "Rédaction du contenu",
                  ].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.5 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                      <span className="text-muted-foreground">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-3xl mx-auto"
            >
              {/* Header */}
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Générateur IA</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Créez votre <span className="gradient-text">exposé</span>
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Entrez votre sujet et laissez notre IA générer un exposé
                  complet et structuré en quelques secondes.
                </p>
              </motion.div>

              {/* Form Card */}
              <motion.div variants={fadeInUp}>
                <GlassCard className="p-8">
                  <div className="space-y-6">
                    {/* Subject Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-primary" />
                        Sujet de l'exposé
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Ex: Le réchauffement climatique et ses conséquences"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                      />

                      {/* Suggested topics */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          Suggestions:
                        </span>
                        {suggestedTopics.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => setSubject(topic)}
                            className="text-xs px-2 py-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Level and Language Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          Niveau scolaire
                        </Label>
                        <Select value={level} onValueChange={setLevel}>
                          <SelectTrigger className="h-12 bg-background/50 border-border/50">
                            <SelectValue placeholder="Sélectionnez un niveau" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {schoolLevels.map((l) => (
                              <SelectItem key={l.value} value={l.value}>
                                <span className="flex items-center gap-2">
                                  <l.icon className="w-4 h-4 text-muted-foreground" />
                                  <span>{l.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          Langue
                        </Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="h-12 bg-background/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {languages.map((l) => (
                              <SelectItem key={l.value} value={l.value}>
                                <span className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-muted-foreground bg-muted px-1 rounded">
                                    {l.code}
                                  </span>
                                  <span>{l.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Length Selection */}
                    <div className="space-y-2">
                      <Label>Longueur de l'exposé</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {lengths.map((l) => (
                          <button
                            key={l.value}
                            onClick={() => setLength(l.value)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              length === l.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 hover:border-primary/30 bg-background/30"
                            }`}
                          >
                            <div className="font-semibold">{l.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {l.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                      variant="hero"
                      size="xl"
                      className="w-full mt-4"
                      onClick={handleGenerate}
                      disabled={!canGenerate}
                    >
                      <Zap className="w-5 h-5" />
                      Générer mon exposé
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
              >
                {[
                  {
                    icon: Zap,
                    title: "Ultra rapide",
                    text: "Génération instantanée",
                  },
                  {
                    icon: GraduationCap,
                    title: "Adapté",
                    text: "Contenu ajusté à votre niveau",
                  },
                  {
                    icon: FileText,
                    title: "Complet",
                    text: "Introduction, plan, conclusion",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
