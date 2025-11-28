import Link from 'next/link';

import { getRecentMessages } from '@/blocks/Messages/getRecentMessages';
import { Media } from '@/components/Media';

interface RecentMessagesProps {
  excludeLatestMessage?: boolean;
}

export const RecentMessages: React.FC<RecentMessagesProps> = async ({
  excludeLatestMessage,
}) => {
  // This component will display recent messages
  const recentMessages = await getRecentMessages(excludeLatestMessage ? 4 : 3); // Fetch one extra if we need to exclude the latest

  // If we need to exclude the latest message, remove it from the list
  if (
    excludeLatestMessage &&
    recentMessages &&
    recentMessages.docs.length > 0
  ) {
    recentMessages.docs = recentMessages.docs.slice(1);
  }
  if (!recentMessages || recentMessages.docs.length === 0) {
    return <div>No recent messages found.</div>;
  }

  return (
    <div>
      <h3 id="recent-messages" className="scroll-mt-32">
        Recent Messages
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {recentMessages.docs.map((message) => (
          <Link
            href={`/messages/${message.slug}`}
            key={message.id}
            className="flex flex-col items-start gap-3 no-underline"
          >
            <div className="w-full overflow-hidden rounded-lg">
              <Media
                resource={message.thumbnail}
                imgClassName="h-60 object-cover object-center hover:scale-110 transition-transform duration-300"
                size='4:3'
              />
            </div>
            <h5>{message.title}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
