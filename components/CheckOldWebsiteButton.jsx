'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import RebrandingPopup from './RebrandingPopup';

/**
 * Component with a button to check if user came from old website
 * When clicked, it checks the referrer and shows the rebranding popup if applicable
 */
const CheckOldWebsiteButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  const handleCheckOldWebsite = async () => {
    setIsLoading(true);
    setCheckResult(null);

    try {
      // Get the referrer URL (from where user came from)
      const referrer = document.referrer || window.location.href;

      // Call the API to check if it's from an old website
      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(referrer)}`);
      const data = await response.json();

      setCheckResult(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.isFromOldWebsite && !data.isFromNewWebsite) {
        // Show the rebranding popup
        setShowPopup(true);
        toast.success(`Welcome from ${data.matchedDomain}!`);
      } else if (data.isFromNewWebsite) {
        toast.info('You are already on our new website!');
      } else {
        toast.info('No old website detected.');
      }
    } catch (error) {
      console.error('Error checking old website:', error);
      toast.error('Failed to check referrer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('rebranding-popup-seen', 'true');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleCheckOldWebsite}
          disabled={isLoading}
          className="bg-gradient-four-colors px-6 py-2 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Checking...' : 'Check Old Website'}
        </Button>

        {checkResult && (
          <div className="mt-4 rounded-lg border bg-gray-50 p-4 text-sm">
            <p className="font-semibold">Check Result:</p>
            <p>From Old Website: {checkResult.isFromOldWebsite ? '✅ Yes' : '❌ No'}</p>
            {checkResult.matchedDomain && <p>Matched Domain: {checkResult.matchedDomain}</p>}
            {checkResult.url && <p>Checked URL: {checkResult.url}</p>}
          </div>
        )}
      </div>

      {/* Show rebranding popup if detected */}
      {showPopup && <RebrandingPopup />}
    </>
  );
};

export default CheckOldWebsiteButton;
