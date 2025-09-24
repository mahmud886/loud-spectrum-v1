'use client';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clipboard,
  DollarSign,
  ExternalLink,
  Globe,
  Info,
  List,
  MessageCircle,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Trash2,
  User,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const sectionIcons = [
  <Info className="text-umbra-100 mr-3 text-2xl" />,
  <ShoppingCart className="text-umbra-100 mr-3 text-2xl" />,
  <Settings className="text-umbra-100 mr-3 text-2xl" />,
  <Clipboard className="text-umbra-100 mr-3 text-2xl" />,
  <DollarSign className="text-umbra-100 mr-3 text-2xl" />,
  <ShoppingCart className="text-umbra-100 mr-3 text-2xl" />,
  <User className="text-umbra-100 mr-3 text-2xl" />,
  <Settings className="text-umbra-100 mr-3 text-2xl" />,
  <ExternalLink className="text-umbra-100 mr-3 text-2xl" />,
  <MessageCircle className="text-umbra-100 mr-3 text-2xl" />,
  <UserCheck className="text-umbra-100 mr-3 text-2xl" />,
  <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />,
  <XCircle className="text-umbra-100 mr-3 text-2xl" />,
  <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />,
  <CheckCircle className="text-umbra-100 mr-3 text-2xl" />,
  <BookOpen className="text-umbra-100 mr-3 text-2xl" />,
  <Trash2 className="text-umbra-100 mr-3 text-2xl" />,
  <List className="text-umbra-100 mr-3 text-2xl" />,
  <Globe className="text-umbra-100 mr-3 text-2xl" />,
  <RefreshCcw className="text-umbra-100 mr-3 text-2xl" />,
  <ArrowLeft className="text-umbra-100 mr-3 text-2xl" />,
];

const sectionKeys = [
  'OVERVIEW',
  'SECTION_1',
  'SECTION_2',
  'SECTION_3',
  'SECTION_4',
  'SECTION_5',
  'SECTION_6',
  'SECTION_7',
  'SECTION_8',
  'SECTION_9',
  'SECTION_10',
  'SECTION_11',
  'SECTION_12',
  'SECTION_13',
  'SECTION_14',
  'SECTION_15',
  'SECTION_16',
  'SECTION_17',
];

const TermsAndConditionsPage = () => {
  const t = useTranslations('TermsAndConditions');

  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[90%] text-center font-sans text-[35px] leading-[120%] font-normal xl:w-[65%] xl:text-[60px]">
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

export default TermsAndConditionsPage;
