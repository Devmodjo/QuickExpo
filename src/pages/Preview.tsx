import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PageLayout, fadeInUp, staggerContainer } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Edit3,
  Copy,
  Check,
  ArrowLeft,
  Printer,
  Share2,
  BookOpen,
  Clock,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample generated content (would come from AI in real implementation)
const sampleContent = {
  title: "Le Réchauffement Climatique et ses Conséquences",
  sections: [
    {
      title: "Introduction",
      content: `Le réchauffement climatique représente l'un des défis majeurs du XXIe siècle. Ce phénomène, caractérisé par une augmentation progressive de la température moyenne à la surface de la Terre, a des répercussions profondes sur les écosystèmes, les sociétés humaines et l'économie mondiale.

Cette problématique, longtemps cantonnée aux cercles scientifiques, s'est imposée comme un enjeu politique et social majeur, mobilisant gouvernements, entreprises et citoyens à travers le monde.`,
    },
    {
      title: "I. Les causes du réchauffement climatique",
      content: `Le réchauffement climatique est principalement causé par les activités humaines, notamment :

**1.1 Les émissions de gaz à effet de serre**
- Dioxyde de carbone (CO2) : combustion de combustibles fossiles
- Méthane (CH4) : élevage intensif et décomposition des déchets
- Protoxyde d'azote (N2O) : agriculture intensive

**1.2 La déforestation**
La destruction des forêts tropicales réduit la capacité d'absorption du CO2 par les arbres, aggravant l'effet de serre.

**1.3 L'industrialisation**
Depuis la révolution industrielle, les émissions de CO2 ont augmenté de plus de 45%, entraînant une hausse de 1,1°C de la température moyenne mondiale.`,
    },
    {
      title: "II. Les conséquences environnementales",
      content: `**2.1 Fonte des glaciers et élévation du niveau des mers**
Les calottes glaciaires de l'Arctique et de l'Antarctique fondent à un rythme alarmant. Le niveau de la mer a augmenté de 20 cm depuis 1900.

**2.2 Événements climatiques extrêmes**
- Augmentation de la fréquence et de l'intensité des ouragans
- Vagues de chaleur prolongées
- Sécheresses et inondations

**2.3 Perte de biodiversité**
De nombreuses espèces sont menacées d'extinction en raison de la modification de leurs habitats naturels.`,
    },
    {
      title: "III. Les solutions envisagées",
      content: `**3.1 La transition énergétique**
Le passage aux énergies renouvelables (solaire, éolien, hydraulique) est essentiel pour réduire les émissions de CO2.

**3.2 Les accords internationaux**
L'Accord de Paris (2015) engage les pays signataires à limiter le réchauffement à 1,5°C d'ici 2100.

**3.3 Les actions individuelles**
- Réduction de la consommation d'énergie
- Mobilité durable (transports en commun, vélo)
- Alimentation responsable`,
    },
    {
      title: "Conclusion",
      content: `Le réchauffement climatique constitue une menace existentielle pour l'humanité et la biodiversité. Face à l'urgence, une action collective et coordonnée à tous les niveaux – individuel, national et international – est impérative.

Les solutions existent et sont à notre portée. Il appartient à chaque génération de prendre ses responsabilités pour préserver notre planète pour les générations futures.`,
    },
  ],
  references: [
    "GIEC, Rapport spécial sur le réchauffement planétaire de 1,5°C, 2018",
    "NASA, Global Climate Change: Vital Signs of the Planet, 2024",
    "ADEME, Guide de la transition écologique, 2023",
  ],
};

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const metadata = location.state || {
    subject: "Le réchauffement climatique",
    level: "lycee",
    language: "fr",
    length: "moyen",
    generatedAt: new Date().toISOString(),
  };

  const handleCopy = async () => {
    const text = sampleContent.sections.map((s) => `${s.title}\n\n${s.content}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copié !",
      description: "Le contenu a été copié dans le presse-papiers.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: "pdf" | "word") => {
    toast({
      title: `Export ${format.toUpperCase()}`,
      description: "Le téléchargement va commencer...",
    });
    // In real implementation, this would trigger actual file download
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
            <Link to="/generate">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copié" : "Copier"}
              </Button>
              <Button variant="glass" size="sm">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
              <Button variant="glass" size="sm">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>
          </motion.div>

          {/* Metadata Card */}
          <motion.div variants={fadeInUp} className="mb-8">
            <GlassCard className="p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Sujet:</span>
                  <span className="font-medium">{metadata.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Niveau:</span>
                  <span className="font-medium capitalize">{metadata.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Généré le:</span>
                  <span className="font-medium">
                    {new Date(metadata.generatedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Document Preview */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8 md:p-12">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold font-display text-center mb-8 pb-6 border-b border-border/50">
                {sampleContent.title}
              </h1>

              {/* Content Sections */}
              <div className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
                {sampleContent.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h2 className="text-xl font-semibold gradient-text mb-4">
                      {section.title}
                    </h2>
                    <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {section.content.split("**").map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="text-foreground">
                            {part}
                          </strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* References */}
                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Références</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {sampleContent.references.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={() => handleDownload("pdf")}
            >
              <Download className="w-4 h-4" />
              Télécharger PDF
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1"
              onClick={() => handleDownload("word")}
            >
              <FileText className="w-4 h-4" />
              Exporter Word
            </Button>
            <Button variant="glass" size="lg" className="flex-1">
              <Edit3 className="w-4 h-4" />
              Modifier
            </Button>
          </motion.div>

          {/* Generate Another */}
          <motion.div variants={fadeInUp} className="text-center mt-8">
            <Link to="/generate">
              <Button variant="link" className="text-muted-foreground">
                Générer un autre exposé →
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
