import { FileText, Globe, Lightbulb, Scale } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LegalsPage = () => {
  const t = useTranslations();

  const legalSections = [
    {
      icon: <Scale className="text-umbra-100 mr-3 text-2xl" />,
      title: t('LegalPage.RegulatoryCompliance.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('LegalPage.RegulatoryCompliance.noControlledSubstances')}</li>
          <li>{t('LegalPage.RegulatoryCompliance.terpenesOnly')}</li>
          <li>{t('LegalPage.RegulatoryCompliance.notForDirectUse')}</li>
        </ul>
      ),
    },
    {
      icon: <Globe className="text-umbra-100 mr-3 text-2xl" />,
      title: t('LegalPage.JurisdictionResponsibility.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('LegalPage.JurisdictionResponsibility.buyerResponsibility')}</li>
          <li>{t('LegalPage.JurisdictionResponsibility.internationalOrders')}</li>
        </ul>
      ),
    },
    {
      icon: <FileText className="text-umbra-100 mr-3 text-2xl" />,
      title: t('LegalPage.NoMedicalClaims.title'),
      content: <p>{t('LegalPage.NoMedicalClaims.content')}</p>,
    },
    {
      icon: <Lightbulb className="text-umbra-100 mr-3 text-2xl" />,
      title: t('LegalPage.IntellectualProperty.title'),
      content: <p>{t('LegalPage.IntellectualProperty.content')}</p>,
    },
  ];

  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal xl:w-[35%] xl:text-[60px]">
          {t('LegalPage.LegalDisclaimer')}
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">{t('LegalPage.intro')}</p>
          <div className="space-y-8">
            {legalSections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center">
                  {section.icon}
                  <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-umbra-100 font-mono text-base leading-relaxed">{section.content}</div>
                {idx !== legalSections.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-umbra-40 text-sm">
              {t('LegalPage.moreInfo')}{' '}
              <a href="mailto:Info@loudspectrum.com" className="text-blue-600 underline">
                Info@loudspectrum.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalsPage;
