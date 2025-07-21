import { AlertTriangle, FlaskConical, Leaf, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const QualityAndSafetyPage = () => {
  const t = useTranslations();

  const qualitySafetySections = [
    {
      icon: <Leaf className="text-umbra-100 mr-3 text-2xl" />, // Product Purity & Integrity
      title: t('QualitySafety.ProductPurityIntegrity.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('QualitySafety.ProductPurityIntegrity.pureTerpenes')}</li>
          <li>{t('QualitySafety.ProductPurityIntegrity.foodGrade')}</li>
          <li>{t('QualitySafety.ProductPurityIntegrity.nonGMO')}</li>
        </ul>
      ),
    },
    {
      icon: <FlaskConical className="text-umbra-100 mr-3 text-2xl" />, // Quality Control & Testing
      title: t('QualitySafety.QualityControlTesting.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('QualitySafety.QualityControlTesting.rigorousTesting')}</li>
          <li>{t('QualitySafety.QualityControlTesting.identityConsistency')}</li>
          <li>
            {t('QualitySafety.QualityControlTesting.purityScreening')}
            <ul className="list-disc pl-5">
              <li>{t('QualitySafety.QualityControlTesting.residualSolvents')}</li>
              <li>{t('QualitySafety.QualityControlTesting.heavyMetals')}</li>
              <li>{t('QualitySafety.QualityControlTesting.microbialContamination')}</li>
              <li>{t('QualitySafety.QualityControlTesting.pesticideResidues')}</li>
            </ul>
          </li>
          <li>{t('QualitySafety.QualityControlTesting.batchTracking')}</li>
        </ul>
      ),
    },
    {
      icon: <Lock className="text-umbra-100 mr-3 text-2xl" />, // Safety Assurance
      title: t('QualitySafety.SafetyAssurance.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('QualitySafety.SafetyAssurance.msdsGuidelines')}</li>
          <li>{t('QualitySafety.SafetyAssurance.highlyConcentrated')}</li>
          <li>{t('QualitySafety.SafetyAssurance.professionalUse')}</li>
          <li>{t('QualitySafety.SafetyAssurance.storage')}</li>
          <li>{t('QualitySafety.SafetyAssurance.msdsCompliance')}</li>
        </ul>
      ),
    },
    {
      icon: <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />, // Caution Notice
      title: t('QualitySafety.CautionNotice.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('QualitySafety.CautionNotice.caution')}</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal md:w-[55%] md:text-[60px]">
          {t('Quality_&_Safety')}
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">{t('QualitySafety.intro')}</p>
          <div className="space-y-8">
            {qualitySafetySections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center">
                  {section.icon}
                  <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-umbra-100 font-mono text-base leading-relaxed">{section.content}</div>
                {idx !== qualitySafetySections.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-umbra-40 text-sm">
              {t('QualitySafety.moreInfo')}{' '}
              <a href="mailto:info@loudspectrum.com" className="text-blue-600 underline">
                info@loudspectrum.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAndSafetyPage;
