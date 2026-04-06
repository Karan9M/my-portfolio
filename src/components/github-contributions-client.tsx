'use client'

import dynamic from 'next/dynamic'
import { GithubSkeleton } from '@/components/skeletons/github-skeleton'

export const GithubContributionsClient = dynamic(
  () =>
    import('@/components/github-calendar').then(
      (mod) => mod.GithubContributions
    ),
  {
    ssr: false,
    loading: () => <GithubSkeleton />,
  }
)
