import { useEffect, useState } from "react";

export function usePreloadedImages(imageUrls: string[]) {
  const [cache, setCache] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      const blobUrls = await Promise.all(
        imageUrls.map(async (url) => {
          const res = await fetch(`/api/image${url}`);
          const blob = await res.blob();
          return URL.createObjectURL(blob);
        })
      );

      if (!isCancelled) {
          setCache(blobUrls);
          setIsReady(true);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  return { cache, isReady };
}