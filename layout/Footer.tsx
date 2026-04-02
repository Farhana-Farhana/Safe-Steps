import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footprints, Heart } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Footprints className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                {t("header.safeSteps")}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("common.learn")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/disabilities/blindness" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("disabilities.blindness.title")}
                </Link>
              </li>
              <li>
                <Link to="/disabilities/deafness" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("disabilities.deafness.title")}
                </Link>
              </li>
              <li>
                <Link to="/disabilities/dyslexia" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("disabilities.dyslexia.title")}
                </Link>
              </li>
              <li>
                <Link to="/disabilities/speech-disability" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("disabilities.speechDisability.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("common.community")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("common.community")}
                </Link>
              </li>
              <li>
                <Link to="/survey" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("common.takeSurvey")}
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("common.joinUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.support")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
