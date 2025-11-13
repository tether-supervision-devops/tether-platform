import { delay } from '@/constants/mock-api';
import { SessionCard } from '@/features/overview/components/current-meeting-card';

export default async function Sales() {
  await delay(3000);
  return <SessionCard />;
}
