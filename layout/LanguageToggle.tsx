import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ml' ? 'en' : 'ml';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 font-medium"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">
        {i18n.language === 'ml' ? 'English' : 'മലയാളം'}
      </span>
      <span className="sm:hidden">
        {i18n.language === 'ml' ? 'EN' : 'മല'}
      </span>
    </Button>
  );
}
