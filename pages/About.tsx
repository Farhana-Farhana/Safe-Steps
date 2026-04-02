import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Users, Heart, Target, Mail } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="gradient-hero py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {t("about.title")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">{t("about.description")}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl space-y-12">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold mb-2">{t("about.missionTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.missionDesc")}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold mb-2">{t("about.whatWeDoTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.whatWeDoDesc")}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold mb-2">{t("about.contactTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.contactDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
