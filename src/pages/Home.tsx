import { motion, AnimatePresence } from "framer-motion";
import {
  PageLayout,
  staggerContainer,
  fadeInUp,
} from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  FileText,
  CheckCircle,
  BookOpen,
  Users,
  Brain,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Eye,
  Layers,
  Briefcase,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "Assistant Méthodologique",
    description:
      "QuickExpo ne fait pas le travail à votre place, il vous aide à structurer vos idées et à organiser votre plan de manière cohérente.",
  },
  {
    icon: Eye,
    title: "Preview Avant Validation",
    description:
      "Visualisez et validez le plan et le contenu avant de générer le document final. Vous gardez le contrôle total.",
  },
  {
    icon: Layers,
    title: "Structure Académique",
    description:
      "Des documents parfaitement structurés : introduction, développement, conclusion, adaptés à votre niveau scolaire.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-Plagiat",
    description:
      "Un outil conçu pour comprendre et apprendre, pas pour tricher. Nous encourageons la reformulation et l'appropriation du contenu.",
  },
];

const targets = [
  { label: "Étudiants", icon: GraduationCap },
  { label: "Élèves", icon: BookOpen },
  { label: "Enseignants", icon: Users },
  { label: "Jeunes Pro", icon: Briefcase },
];

const steps = [
  {
    title: "Décrivez votre sujet",
    desc: "Indiquez le thème et le niveau scolaire souhaité.",
    icon: FileText,
  },
  {
    title: "Validez la preview",
    desc: "Vérifiez la structure et le contenu proposés par l'IA.",
    icon: Eye,
  },
  {
    title: "Obtenez votre document",
    desc: "Exportez un document propre, structuré et prêt à l'emploi.",
    icon: CheckCircle,
  },
];

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden perspective-1000">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-muted/50 to-transparent opacity-60 skew-x-12 transform origin-top-right" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-r from-muted/30 to-transparent opacity-40 skew-x-12 transform origin-bottom-left" />
        </div>

        {/* 3D Rotating Square Animation - High Visibility */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-50 dark:opacity-40">
          <motion.div
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-[500px] h-[500px] border-[2px] border-primary/60 rounded-[3rem] relative shadow-2xl shadow-primary/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner styling for depth perception */}
            <div className="absolute inset-4 border-[2px] border-secondary/50 rounded-[2.5rem]" />
            <div className="absolute inset-12 border-[2px] border-primary/40 rounded-[2rem]" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex justify-center items-center"
          >
            <div className="text-center">
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wide uppercase mb-8"
              >
                <Brain className="w-3 h-3" />
                <span>Assistant Intelligent</span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6 text-primary"
              >
                Votre assistant <br />
                <span className="text-secondary">méthodologique</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto"
              >
                QuickExpo vous aide à structurer, rédiger et mettre en forme vos
                exposés et documents techniques. Gagnez du temps sur la forme
                pour vous concentrer sur le fond.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center item-center flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  size="xl"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Tester QuickExpo
                </Button>
                <a href="#how-it-works">
                  <Button
                    variant="outline"
                    size="xl"
                    className="rounded-xl px-8 border-primary/20 hover:bg-primary/5 w-full sm:w-auto"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Comment ça marche
                  </Button>
                </a>
              </motion.div>

              {/* Targets */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center items-center flex-wrap gap-4 mt-8 mb-5 border-t border-border pt-8"
              >
                {targets.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50"
                  >
                    <span className="text-lg">
                      <t.icon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {t.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-primary">
              Comment ça <span className="text-secondary">marche ?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Une méthode simple en 3 étapes pour garantir la qualité de votre
              travail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full flex flex-col items-center text-center hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-primary">
              Pourquoi choisir{" "}
              <span className="text-secondary">QuickExpo ?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Plus qu'un générateur, un outil pédagogique pour réussir vos
              devoirs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group p-8 h-full bg-card hover:bg-card/50 border border-border/50 hover:border-primary/20 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/5 group-hover:bg-primary/5 flex items-center justify-center flex-shrink-0 transition-colors">
                    <feature.icon className="w-6 h-6 text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company/Vision Section */}
      <section className="py-24 relative overflow-hidden bg-muted/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-8 text-primary">
                Notre mission : <br />
                <span className="text-secondary">Apprendre mieux</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Nous croyons que l'IA doit être un levier pour
                  l'apprentissage, pas un remplaçant. QuickExpo est conçu pour
                  vous aider à surmonter l'angoisse de la page blanche et à
                  comprendre la structure d'un bon exposé.
                </p>
                <p>
                  Des milliers d'étudiants et de professionnels utilisent
                  QuickExpo pour structurer leurs pensées et produire des
                  documents de qualité supérieure.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlassCard className="relative p-10 rounded-3xl border-secondary/10">
                <blockquote className="text-xl font-medium leading-relaxed text-foreground italic">
                  "L'objectif est d'aider à comprendre, structurer et produire,
                  pas de tricher."
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-primary">
                      L'équipe QuickExpo
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">
              Prêt à gagner du temps ?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Rejoignez les utilisateurs qui ont choisi QuickExpo pour leurs
              travaux académiques et professionnels.
            </p>
            <div className="flex justify-center w-full">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                size="xl"
                variant="secondary"
                className="rounded-xl px-10 py-6 text-lg shadow-2xl hover:shadow-white/10 w-full md:w-auto"
              >
                Créer mon premier document
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full w-12 h-12 bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm border border-white/10"
            >
              <ArrowUp className="w-5 h-5 text-primary-foreground" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
