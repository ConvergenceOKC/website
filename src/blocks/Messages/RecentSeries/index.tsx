import Link from 'next/link';

import { getRecentSeries } from '@/blocks/Messages/getRecentSeries';
import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';

export const RecentSeries: React.FC = async () => {
  // This component will display recent messages from a series.
  const recentSeries = await getRecentSeries();
  if (!recentSeries || recentSeries.docs.length === 0) {
    return <div>No recent series found.</div>;
  }

  return (
    <div>
      <h3 id="recent-series" className="scroll-mt-32">
        Recent Series
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {recentSeries.docs.map((series) => (
          <Link
            href={`/messages/series/${series.slug}`}
            key={series.id}
            className="flex flex-col items-start gap-3 no-underline"
          >
            <div className="w-full overflow-hidden rounded-lg">
              <Media
                resource={series.thumbnail}
                imgClassName="h-60 object-cover object-center hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h5>{series.title}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
