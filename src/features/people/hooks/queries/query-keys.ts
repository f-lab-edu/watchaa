import { MovieCreditsRequestParams } from '@/features/people/types/people';

export const peopleQueryKeys = {
  all: ['people'] as const,
  movieCredits: ({ person_id, language }: MovieCreditsRequestParams) =>
    [...peopleQueryKeys.all, 'movieCredits', { person_id, language }] as const,
};
