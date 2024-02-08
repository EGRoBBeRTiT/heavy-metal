import { useContext } from 'react';

import { HistoryContext } from '@/contexts/HistoryContext';

export const useHistory = () => useContext(HistoryContext);
