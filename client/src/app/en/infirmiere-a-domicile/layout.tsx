import { cityHubMetadata } from '../../../lib/citySeo';

export const metadata = cityHubMetadata('EN');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
