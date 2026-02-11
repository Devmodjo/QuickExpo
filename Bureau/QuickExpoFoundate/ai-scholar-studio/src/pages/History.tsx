import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout, fadeInUp, staggerContainer } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Clock,
  Download,
  Eye,
  Trash2,
  GraduationCap,
  Calendar,
  MoreVertical,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Sample history data
const historyItems = [
  {
    id: "1",
    title: "Le Réchauffement Climatique et ses Conséquences",
    level: "Lycée",
    language: "Français",
    createdAt: "2024-12-28T14:30:00",
    pages: 5,
  },
  {
    id: "2",
    title: "La Révolution Française : Causes et Conséquences",
    level: "Collège",
    language: "Français",
    createdAt: "2024-12-27T10:15:00",
    pages: 4,
  },
  {
    id: "3",
    title: "L'Intelligence Artificielle dans l'Éducation",
    level: "Université",
    language: "Français",
    createdAt: "2024-12-26T16:45:00",
    pages: 8,
  },
  {
    id: "4",
    title: "Les Énergies Renouvelables",
    level: "Lycée",
    language: "Français",
    createdAt: "2024-12-25T09:00:00",
    pages: 6,
  },
  {
    id: "5",
    title: "The Impact of Social Media on Society",
    level: "Université",
    language: "English",
    createdAt: "2024-12-24T11:30:00",
    pages: 7,
  },
];

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(historyItems);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Votre <span className="gradient-text">Historique</span>
            </h1>
            <p className="text-muted-foreground">
              Retrouvez tous vos exposés générés précédemment.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={fadeInUp} className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un exposé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-card/50 border-border/50"
              />
            </div>
            <Button variant="glass" size="icon" className="h-12 w-12">
              <Filter className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* History List */}
          <motion.div variants={fadeInUp} className="space-y-4">
            {filteredItems.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun exposé trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? "Aucun résultat pour cette recherche."
                    : "Vous n'avez pas encore généré d'exposé."}
                </p>
                <Link to="/generate">
                  <Button variant="glow">Générer mon premier exposé</Button>
                </Link>
              </GlassCard>
            ) : (
              filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="p-6 hover:border-primary/30 transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      {/* Icon and Content */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-2 truncate group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5" />
                              {item.level}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              {item.pages} pages
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link to="/preview" state={{ subject: item.title, level: item.level.toLowerCase(), generatedAt: item.createdAt }}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Voir</span>
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">PDF</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Exporter Word
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Stats Footer */}
          {filteredItems.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{items.length} exposés générés</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>~{items.reduce((acc, item) => acc + item.pages, 0)} pages au total</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
}
