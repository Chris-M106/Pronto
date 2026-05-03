import { useCallback, useEffect, useState } from 'react';
import { searchProviders, type ProviderFilter, type ProviderListItem } from '../services/providers';

export function useProviders(initialFilter: ProviderFilter = {}) {
  const [filter, setFilter] = useState<ProviderFilter>(initialFilter);
  const [providers, setProviders] = useState<ProviderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (f?: ProviderFilter) => {
    const next = f ?? filter;
    setLoading(true);
    setError(null);
    try {
      const list = await searchProviders(next);
      setProviders(list);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    refresh();
  }, []);

  return { providers, loading, error, filter, setFilter, refresh };
}
