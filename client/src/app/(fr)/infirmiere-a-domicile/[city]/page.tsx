'use client';

import { useParams } from 'next/navigation';
import { CityLanding } from '@/components/sections/CityLanding';

export default function CityPage() {
  const params = useParams();
  const slug = Array.isArray(params?.city) ? params.city[0] : (params?.city as string);
  return <CityLanding slug={slug} />;
}
