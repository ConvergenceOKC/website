import { Message } from "@/payload-types";
import { formatDateTime } from "@/utilities/formatDateTime";
import { Dot } from "lucide-react";

export const MessageInfoBar: React.FC<{message: Message}> = ({message}) => {
  // Build the info text as a single string to prevent unwanted line breaks
  const seriesText = message.series 
    ? (typeof message.series === 'object' && 'title' in message.series
        ? message.series.title
        : message.series)
    : '';

  const scriptureText = Array.isArray(message.scripture) && message.scripture.length > 0
    ? message.scripture
        .map((ref) => {
          if (ref.book && ref.chapter && ref.verses) {
            return `${ref.book} ${ref.chapter}:${ref.verses}`;
          } else if (ref.book && ref.chapter) {
            return `${ref.book} ${ref.chapter}`;
          } else {
            return `${ref.book}`;
          }
        })
        .join('; ')
    : '';

  const speakerText = typeof message.speaker === 'object' && 'name' in message.speaker
    ? message.speaker.name
    : message.speaker;

  // Create a single text string with separators
  const parts = [formatDateTime(message.date)];
  if (seriesText) parts.push(seriesText);
  if (scriptureText) parts.push(scriptureText);
  if (speakerText) parts.push(speakerText);

  return (
    <div className="mb-4 text-xs uppercase opacity-70 sm:mb-6 sm:text-sm">
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <Dot className="inline h-3 w-3 sm:h-4 sm:w-4" />}
          {part}
        </span>
      ))}
    </div>
  );
}