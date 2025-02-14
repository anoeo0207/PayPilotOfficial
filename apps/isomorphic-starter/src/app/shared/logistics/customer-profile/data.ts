import { avatarIds } from 'isomorphic-core/src/utils/get-avatar';
import { getRandomArrayElement } from 'isomorphic-core/src/utils/get-random-array-element';
import CargoDamaged from 'isomorphic-core/src/components/icons/cargo-damaged';
import MagnifyingGlassIconColor from 'isomorphic-core/src/components/icons/magnifying-glass-color';
import TransactionIcon from 'isomorphic-core/src/components/icons/transactions';
import InvoicePrint from 'isomorphic-core/src/components/icons/invoice-print';
import RefundIcon from 'isomorphic-core/src/components/icons/refund';
import TurtleIcon from 'isomorphic-core/src/components/icons/turtle';
import ShipWithContainer from 'isomorphic-core/src/components/icons/ship-with-container';

export const customer = {
  avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
    avatarIds
  )}.png`,
  name: 'Irene Powlowski',
  email: 'johnson.olson@yahoo.com',
  phone: '(440) 701-6597',
  address: '49001 Mossie Row Berkshire',
  branch: 'Main-Branch',
};

export const stats = [
  {
    icon: TransactionIcon,
    label: 'Transactions',
    value: 2890,
    isCurrency: true,
  },
  { icon: InvoicePrint, label: 'Due', value: 2890, isCurrency: true },
  { icon: RefundIcon, label: 'Refund', value: 310, isCurrency: true },
  { icon: ShipWithContainer, label: 'Shipments', value: 120 },
  { icon: CargoDamaged, label: 'Damaged', value: 8 },
  { icon: TurtleIcon, label: 'Late Delivery', value: 34 },
  { icon: MagnifyingGlassIconColor, label: 'Lost Shipment', value: 2 },
];
