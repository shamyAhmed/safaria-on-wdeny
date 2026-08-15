import { useRef } from "react";

/** How long to wait between polls while results are still trickling in. */
const POLL_INTERVAL_MS = 5000;
/** How many consecutive responses without a new id end the polling. */
const MAX_IDLE_ROUNDS = 3;

/** The slice of react-query's `Query` this hook actually reads. */
type PollableQuery<TData> = {
  state: { data: TData | undefined; dataUpdatedAt: number };
};

type PollOptions<TData, TItem> = {
  /** Pulls the result list out of whatever shape the query returns. */
  selectItems: (data: TData) => TItem[];
  getId: (item: TItem) => string | number;
  /** Serialised search input — changing it starts a fresh polling cycle. */
  resetKey: string;
  /** Holds the polling off while the response says more is already waiting. */
  shouldPoll?: (data: TData) => boolean;
};

/**
 * Search endpoints fill up over a few seconds as the suppliers answer, so the
 * results are polled until three responses in a row bring nothing new.
 *
 * Returns the function to hand to `refetchInterval`. react-query re-evaluates
 * it after every query update, so the bookkeeping is guarded on
 * `dataUpdatedAt` to score each response exactly once.
 */
const usePollForNewResults = <TData, TItem>({
  selectItems,
  getId,
  resetKey,
  shouldPoll,
}: PollOptions<TData, TItem>) => {
  const seenIds = useRef(new Set<string | number>());
  const idleRounds = useRef(0);
  const lastUpdatedAt = useRef(0);
  const lastResetKey = useRef(resetKey);

  if (lastResetKey.current !== resetKey) {
    lastResetKey.current = resetKey;
    seenIds.current = new Set();
    idleRounds.current = 0;
    lastUpdatedAt.current = 0;
  }

  return (query: PollableQuery<TData>) => {
    const { data, dataUpdatedAt } = query.state;

    if (data !== undefined && dataUpdatedAt !== lastUpdatedAt.current) {
      lastUpdatedAt.current = dataUpdatedAt;

      let hasNewIds = false;
      for (const item of selectItems(data)) {
        const id = getId(item);
        if (seenIds.current.has(id)) continue;
        seenIds.current.add(id);
        hasNewIds = true;
      }

      idleRounds.current = hasNewIds ? 0 : idleRounds.current + 1;
    }

    if (idleRounds.current >= MAX_IDLE_ROUNDS) return false;
    if (data !== undefined && shouldPoll?.(data) === false) return false;

    return POLL_INTERVAL_MS;
  };
};

export default usePollForNewResults;
