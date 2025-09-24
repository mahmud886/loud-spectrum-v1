'use client';
import { FileText, HelpCircle, Link2, Lock, RefreshCcw, Shield, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const sectionIcons = [
  <UserCheck className="text-umbra-100 mr-3 text-2xl" />,
  <Shield className="text-umbra-100 mr-3 text-2xl" />,
  <FileText className="text-umbra-100 mr-3 text-2xl" />,
  <Link2 className="text-umbra-100 mr-3 text-2xl" />,
  <Lock className="text-umbra-100 mr-3 text-2xl" />,
  <RefreshCcw className="text-umbra-100 mr-3 text-2xl" />,
  <HelpCircle className="text-umbra-100 mr-3 text-2xl" />,
];

const sectionKeys = ['SECTION_1', 'SECTION_2', 'SECTION_3', 'SECTION_5', 'SECTION_6', 'SECTION_8', 'QUESTIONS'];

const PrivacyPolicyPage = () => {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal xl:w-[35%] xl:text-[60px]">
          {t('title')}
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <div className="space-y-8">
            {sectionKeys.map((key, idx) => {
              const section = t.raw(`${key}`);
              const icon = sectionIcons[idx];
              return (
                <div key={section.title}>
                  <div className="mb-2 flex items-center">
                    {icon}
                    <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                  </div>
                  <div className="text-umbra-100 space-y-2 font-mono text-base leading-relaxed">
                    {Array.isArray(section.content) ? (
                      section.content.map((line, i) => {
                        // Bold the first part if it matches a pattern (e.g., 'Email marketing (if applicable):')
                        const boldMatch = line.match(/^(<b>)?(.*?:)(<\/b>)?\s?(.*)$/);
                        if (boldMatch && boldMatch[2]) {
                          return (
                            <p key={i}>
                              <b>{boldMatch[2]}</b> {boldMatch[4]}
                            </p>
                          );
                        }
                        // Special case: email links
                        if (line.includes('hi@loudspectrum.com')) {
                          return (
                            <p key={i}>
                              {line.replace('hi@loudspectrum.com', '')}
                              <a href="mailto:hi@loudspectrum.com" className="text-blue-600 underline">
                                hi@loudspectrum.com
                              </a>
                            </p>
                          );
                        }
                        if (line.includes('hi@loudspectrum.com')) {
                          return (
                            <p key={i}>
                              {line.replace('hi@loudspectrum.com', '')}
                              <a href="mailto:hi@loudspectrum.com" className="text-blue-600 underline">
                                hi@loudspectrum.com
                              </a>
                            </p>
                          );
                        }
                        return <p key={i}>{line}</p>;
                      })
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                  {idx !== sectionKeys.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
