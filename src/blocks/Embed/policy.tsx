type Props = {
  policyKey: string;
};

const termageddonAPIPath = 'https://policies.termageddon.com/api/policy/';

const Policy: React.FC<Props> = async ({ policyKey }) => {
  const data = await fetch(termageddonAPIPath + policyKey, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  });

  if (!data.ok) {
    return <div>Unable to load policy.</div>;
  }

  const text = await data.text();

  if (!text) {
    return <div>No policy found.</div>;
  }

  return <div id="policy" dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Policy;
