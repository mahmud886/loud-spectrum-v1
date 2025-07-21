import { FileText, Globe, Lightbulb, Scale } from 'lucide-react';

const legalSections = [
  {
    icon: <Scale className="text-umbra-100 mr-3 text-2xl" />,
    title: 'Regulatory Compliance',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>No Controlled Substances:</strong> Loud Spectrum products do not contain any cannabinoids, including
          but not limited to CBD (Cannabidiol), THC (Tetrahydrocannabinol), or any other regulated compounds under
          federal or state law.
        </li>
        <li>
          <strong>Terpenes Only:</strong> Our offerings are composed solely of pure, botanical terpenes and terpene
          blends. All ingredients are GRAS-listed (Generally Recognized as Safe) and compliant with U.S. food and
          cosmetic standards.
        </li>
        <li>
          <strong>Not for Direct Inhalation or Consumption:</strong> Our terpenes are intended for professional use
          only, including formulation in cosmetics, food/beverage flavoring, and fragrance applications.
        </li>
      </ul>
    ),
  },
  {
    icon: <Globe className="text-umbra-100 mr-3 text-2xl" />,
    title: 'Jurisdiction & Responsibility',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Buyer Responsibility:</strong> It is the sole responsibility of the customer to ensure that use,
          possession, and application of our products complies with local, state, and federal laws. Loud Spectrum
          assumes no liability for misuse or unlawful distribution.
        </li>
        <li>
          <strong>International Orders:</strong> We ship worldwide in compliance with export regulations. However, we
          are not responsible for customs delays or confiscations. Customers should verify legality of terpene imports
          in their country before ordering.
        </li>
      </ul>
    ),
  },
  {
    icon: <FileText className="text-umbra-100 mr-3 text-2xl" />,
    title: 'No Medical Claims',
    content: (
      <p>
        Loud Spectrum makes no medical claims about the benefits or uses of terpenes. Our products are not intended to
        diagnose, treat, cure, or prevent any disease. All information provided is for educational purposes only.
      </p>
    ),
  },
  {
    icon: <Lightbulb className="text-umbra-100 mr-3 text-2xl" />,
    title: 'Intellectual Property',
    content: (
      <p>
        All content on this site, including branding, product names, images, and formulations, is the intellectual
        property of Loud Spectrum and may not be copied or redistributed without written permission.
      </p>
    ),
  },
];

const LegalPage = () => {
  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal md:w-[35%] md:text-[60px]">
          Legal Disclaimer
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">
            Loud Spectrum (formerly Medical Terpenes) is committed to transparency and legal compliance in the
            development, marketing, and distribution of our terpene-based products.
          </p>
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
              For questions or legal inquiries, please contact us at{' '}
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

export default LegalPage;
