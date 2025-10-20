import { getWholesalerMergedProducts } from '@/services/get-wholesaler-merged-products';
import WholesaleStorePage from './_components/WholesaleStorePage';

export default async function WholesaleStore() {
  const wholesalerMergedProducts = await getWholesalerMergedProducts();
  return <WholesaleStorePage serverProducts={wholesalerMergedProducts?.data} />;
}
