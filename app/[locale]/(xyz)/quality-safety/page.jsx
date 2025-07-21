import { AlertTriangle, FlaskConical, Leaf, Lock } from 'lucide-react';

const qualitySafetySections = [
  {
    icon: <Leaf className="text-umbra-100 mr-3 text-2xl" />, // Product Purity & Integrity
    title: 'Product Purity & Integrity',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>100% Pure Terpenes:</strong> Our products contain no fillers, no additives, no cutting agents, and are
          derived from high-grade botanical sources/flowers.
        </li>
        <li>
          <strong>Food-Grade & GRAS-Listed:</strong> All Loud Spectrum terpenes are manufactured using ingredients that
          are Generally Recognized as Safe (GRAS) by the FDA for food and beverage use.
        </li>
        <li>
          <strong>Non-GMO:</strong> We do not use genetically modified organisms, and our products are free of common
          allergens including gluten, soy, and dairy.
        </li>
      </ul>
    ),
  },
  {
    icon: <FlaskConical className="text-umbra-100 mr-3 text-2xl" />, // Quality Control & Testing
    title: 'Quality Control & Testing',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Every batch of our terpenes undergoes rigorous in-house and third-party testing to ensure:</strong>
        </li>
        <li>
          <strong>Identity & Consistency:</strong> Verified through gas chromatography (GC) and other validated methods.
        </li>
        <li>
          <strong>Purity & Contaminant Screening:</strong> We screen for:
          <ul className="list-disc pl-5">
            <li>Residual solvents</li>
            <li>Heavy metals</li>
            <li>Microbial contamination</li>
            <li>Pesticide residues</li>
          </ul>
        </li>
        <li>
          <strong>Batch Tracking:</strong> Each bottle is traceable back to its batch for complete transparency and
          accountability.
        </li>
      </ul>
    ),
  },
  {
    icon: <Lock className="text-umbra-100 mr-3 text-2xl" />, // Safety Assurance
    title: 'Safety Assurance',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          We follow strict handling and labeling guidelines in accordance with the Material Safety Data Sheet (MSDS):
        </li>
        <li>
          <strong>Highly Concentrated:</strong> Our terpenes are potent and should be diluted prior to use.
        </li>
        <li>
          <strong>For Professional Use Only:</strong> Not intended for direct consumption or undiluted application.
        </li>
        <li>
          <strong>Storage:</strong> Store in a cool, dry place, away from sunlight and ignition sources. Keep out of
          reach of children and pets.
        </li>
        <li>
          <strong>MSDS Compliance:</strong> All of our products are accompanied by up-to-date MSDS documentation for
          regulatory and handling clarity.
        </li>
      </ul>
    ),
  },
  {
    icon: <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />, // Caution Notice
    title: 'Caution Notice',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Terpenes are highly aromatic and bioactive. Improper use may cause irritation or sensitization. Always wear
          appropriate protective gear (gloves, goggles) when handling undiluted products.
        </li>
      </ul>
    ),
  },
];

const QualityAndSafetyPage = () => {
  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal md:w-[55%] md:text-[60px]">
          Quality & Safety Standards
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">
            At Loud Spectrum, quality is our craft and safety is our promise. We are committed to delivering terpene
            products that meet the highest standards of purity, consistency, and compliance.
          </p>
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
              For more information on quality assurance or to request MSDS documents, contact us at{' '}
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
