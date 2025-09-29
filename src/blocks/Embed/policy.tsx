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

  const text = await data.text();

  return (
    <div
      id="policy"
      data-extra="h-align=left&h-depth=3&table-style=accordion"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default Policy;
