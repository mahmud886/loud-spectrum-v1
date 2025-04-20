'use client';

import { useState } from 'react';
import { InformationContent } from '@/components/containers/privacy-policy/InformationContent';
import ConsentContent from '@/components/containers/privacy-policy/ConsentContent';
import DisclosureContent from '@/components/containers/privacy-policy/DisclosureContent';
import ThirdPartyContent from '@/components/containers/privacy-policy/ThirdPartyContent';
import SecurityContent from '@/components/containers/privacy-policy/SecurityContent';
import ChangesContent from '@/components/containers/privacy-policy/ChangesContent';

const tabs = [
  { name: 'What Do We Do With Your Information?', value: 'information', component: InformationContent },
  { name: 'Consent', value: 'consent', component: ConsentContent },
  { name: 'Disclosure', value: 'disclosure', component: DisclosureContent },
  { name: 'Third-Party Services', value: 'third-party', component: ThirdPartyContent },
  { name: 'Security', value: 'security', component: SecurityContent },
  { name: 'Changes to This Policy', value: 'changes', component: ChangesContent },
];

export default function CustomTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const ActiveComponent = tabs.find((tab) => tab.value === activeTab)?.component;

  return (
    <div className="flex justify-between gap-20 overflow-hidden py-16">
      <div className="h-[300px] w-[22%] space-y-5 overflow-auto bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`w-full cursor-pointer text-left font-mono uppercase transition-colors focus:outline-none ${
              activeTab === tab.value ? 'text-umbra-100 font-normal' : 'text-umbra-40'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="text-umbra-100 w-[78%] bg-white text-sm leading-relaxed">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
