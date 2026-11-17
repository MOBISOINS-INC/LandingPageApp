import { cityHubMetadata } from '@/lib/citySeo';

export const metadata = cityHubMetadata('FR');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
