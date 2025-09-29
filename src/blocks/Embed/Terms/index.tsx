import { Suspense } from 'react';

import { Loading } from '@/blocks/Embed/loading';
import Policy from '@/blocks/Embed/policy';

export const Terms: React.FC = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Policy policyKey={process.env.TERMS_POLICY_KEY || ''} />
    </Suspense>
  );
};
