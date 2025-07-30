import React, { useEffect } from 'react';

type Props = {
  policyKey?: string;
};

const termageddonAPIPath = 'https://policies.termageddon.com/api/policy/';

const Policy = ({ policyKey }: Props) => {
  useEffect(() => {
    const policy = document.getElementById('policy');
    if (policy === null || policyKey === undefined) {
      console.log('Error! Could not find policy element or policy key.');
    } else {
      const pol_key = policyKey;
      const pol_extra = policy.dataset.extra ? '?' + policy.dataset.extra : '';
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        console.log('Policy loaded!');
        policy.innerHTML = xhr.responseText;
      };

      xhr.onerror = function () {
        console.log('Error! Could not load policy.');
        policy.innerHTML = 'There has been an error loading this policy!';
      };

      xhr.open('GET', termageddonAPIPath + pol_key + pol_extra);
      xhr.send();
    }
  });

  return (
    <div
      id="policy"
      data-extra="h-align=left&h-depth=3&table-style=accordion"
    />
  );
};

export default Policy;
