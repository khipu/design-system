import { useState, useCallback } from 'react';

export function useCopyToClipboard(resetMs = 1200) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetMs);
      } catch {
        // Clipboard API not available or denied — fail silently
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
