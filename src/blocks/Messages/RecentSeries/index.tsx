import Link from 'next/link';

import { getRecentSeries } from '@/blocks/Messages/getRecentSeries';
import { Media } from '@/components/Media';

export const RecentSeries: React.FC = async () => {
  // This component will display recent messages from a series.
  const recentSeries = await getRecentSeries();
  if (!recentSeries || recentSeries.docs.length === 0) {
    return <div>No recent series found.</div>;
  }

  return (
    <div>
      <h4>Recent Series</h4>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {recentSeries.docs.map((series) => (
          <Link
            href={`/series/${series.id}`}
            key={series.id}
            className="flex flex-col items-start"
          >
            <Media resource={series.thumbnail} size="sm" />
            <h5>{series.title}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
