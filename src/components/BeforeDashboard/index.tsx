'use client';

import { Banner } from '@payloadcms/ui';

import { revalidateTags } from '@/components/BeforeDashboard/revalidateTags';

import './index.scss';

const BeforeDashboard = () => {
  const handleClick = async () => {
    await revalidateTags();
  };

  return (
    <>
      <Banner type="success" className="banner">
        <h4>Welcome to the Convergence Church CMS</h4>
      </Banner>
      <div className="dashboard__group">
        <h2 className="dashboard__label">Quick Links</h2>
        <ul className="dashboard__card-list">
          <li>
            <div className="card card-pages card--has-onclick">
              <h3 className="card__title">Live Site</h3>
              <a
                type="button"
                href="/"
                className="btn card__click"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </li>
          <li>
            <div className="card card-pages card--has-onclick">
              <h3 className="card__title">Reset Cache</h3>
              <a
                type="button"
                href="/"
                className="btn card__click"
                onClick={handleClick}
              />
            </div>
          </li>
        </ul>
      </div>
      <h2>How to Use the CMS</h2>
      <div className="videos">
        <div>
          <h4>Overview</h4>
          <iframe
            src="https://www.loom.com/embed/8bcc4ee4270b4b0d88a132db6c5816fb"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        <div>
          <h4>Editing and Creating Pages</h4>
          <iframe
            src="https://www.loom.com/embed/a347126c27d842aaa29135426d5987e7"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        <div>
          <h4>Adding a Message</h4>
          <iframe
            src="https://www.loom.com/embed/21b1fb2256324a458b38854b290fda34"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default BeforeDashboard;
