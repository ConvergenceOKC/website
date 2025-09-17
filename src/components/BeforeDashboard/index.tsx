'use client';

import { Banner } from '@payloadcms/ui';

import { revalidateTags } from '@/components/BeforeDashboard/revalidateTags';
import { Button } from '@/components/ui/button';

const BeforeDashboard = () => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    await revalidateTags();
  };

  return (
    <>
      <Banner type="success" className="mb-0">
        <h4>Welcome to the Convergence Church website backend!</h4>
      </Banner>
      <p>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Click here
        </a>{' '}
        to visit the live site
      </p>
      <p>
        If you've made changes to the header and/or footer but are not seeing
        them reflected on the site,{' '}
        <a href="" onClick={handleClick}>
          click here
        </a>{' '}
        to clear the cache.
      </p>
    </>
  );
};

export default BeforeDashboard;
