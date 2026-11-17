import { CityLayout, cityMetadata, cityStaticParams } from '../../../../lib/citySeo';
import type { CityParams } from '../../../../lib/citySeo';

export const generateStaticParams = cityStaticParams;

export const generateMetadata = ({ params }: { params: CityParams }) => cityMetadata(params, 'EN');

export default function Layout({ children, params }: { children: React.ReactNode; params: CityParams }) {
  return <CityLayout params={params} lang="EN">{children}</CityLayout>;
}
