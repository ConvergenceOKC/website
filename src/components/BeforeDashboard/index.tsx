'use client';

import { Banner } from '@payloadcms/ui';

import { revalidateTags } from '@/components/BeforeDashboard/revalidateTags';

import './index.scss';

const BeforeDashboard = () => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    await revalidateTags();
  };

  return (
    <>
      <Banner type="success" className="banner">
        <h4>Welcome to the Convergence Church CMS</h4>
      </Banner>
      <p>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Click here
        </a>{' '}
        to visit the live site
      </p>
      <p>
        If you have made changes to the header and/or footer but are not seeing
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
