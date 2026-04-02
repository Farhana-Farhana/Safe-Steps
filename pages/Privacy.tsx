import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="gradient-hero py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {t("privacy.title")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">{t("privacy.description")}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl prose prose-neutral dark:prose-invert">
          <h2>{t("privacy.dataCollection")}</h2>
          <p>{t("privacy.dataCollectionDesc")}</p>

          <h2>{t("privacy.dataUsage")}</h2>
          <p>{t("privacy.dataUsageDesc")}</p>

          <h2>{t("privacy.dataSecurity")}</h2>
          <p>{t("privacy.dataSecurityDesc")}</p>

          <h2>{t("privacy.yourRights")}</h2>
          <p>{t("privacy.yourRightsDesc")}</p>

          <h2>{t("privacy.contact")}</h2>
          <p>{t("privacy.contactDesc")}</p>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
