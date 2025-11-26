'use server';

import { unstable_cache } from 'next/cache';

import config from '@payload-config';
import { getPayload } from 'payload';

export const getRecentSeries = unstable_cache(
  async (limit: number = 3) => {
    const payload = await getPayload({ config });

    try {
      // Get recent messages that have a series, sorted by date
      const recentMessages = await payload.find({
        collection: 'messages',
        where: {
          series: {
            exists: true,
          },
        },
        sort: '-date',
        limit: 50, // Get enough messages to find series diversity
        depth: 1, // Only need basic series data to get IDs
      });

      // Get the first unique series from the sorted messages (most recent first)
      const uniqueSeriesIds = [];
      const seenSeriesIds = new Set();

      for (const message of recentMessages.docs) {
        if (message.series && typeof message.series === 'object') {
          const seriesId = message.series.id;

          if (!seenSeriesIds.has(seriesId)) {
            seenSeriesIds.add(seriesId);
            uniqueSeriesIds.push(seriesId);

            // Stop once we have enough series
            if (uniqueSeriesIds.length >= limit) {
              break;
            }
          }
        }
      }

      const sortedSeriesIds = uniqueSeriesIds;

      // Fetch the series with proper depth to get thumbnail data
      const seriesWithThumbnails = await payload.find({
        collection: 'messageSeries',
        where: {
          id: {
            in: sortedSeriesIds,
          },
        },
        depth: 2,
      });

      // Re-sort the series to maintain the order based on latest message date
      const orderedSeries = sortedSeriesIds
        .map((id) =>
          seriesWithThumbnails.docs.find((series) => series.id === id),
        )
        .filter(Boolean);

      return {
        docs: orderedSeries,
        totalDocs: orderedSeries.length,
        limit,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      };
    } catch (error) {
      throw new Error(`Error getting recent series: ${error}`);
    }
  },
  ['recent-series'],
  { tags: ['messages'] },
);
