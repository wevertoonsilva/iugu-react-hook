import { Iugu } from 'iugu';
import {useEffect, useRef, useState} from "react";

interface UseIuguProps {
  accountId: string;
  testMode?: boolean;
}

interface UseIuguReturn {
  iugu: Iugu | null;
  error: Error | null;
  isLoading: boolean;
}

const IUGU_SCRIPT_URL = 'https://js.iugu.com/v2/iugu.min.js';

const useIugu = ({ accountId, testMode = false }: UseIuguProps): UseIuguReturn => {
  const [iuguInstance, setIuguInstance] = useState<Iugu | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const loadScript = async () => {
      if (scriptLoaded.current) return;

      setIsLoading(true);

      try {
        const existingScript = document.querySelector<HTMLScriptElement>(
          `script[src="${IUGU_SCRIPT_URL}"]`
        );

        if (existingScript) {
          scriptLoaded.current = true;
          setIuguInstance(new (window as any).Iugu());
          setError(null);
        } else {
          const script = document.createElement('script');
          script.src = IUGU_SCRIPT_URL;
          script.async = true;
          script.onload = () => {
            scriptLoaded.current = true;
            setIuguInstance(new (window as any).Iugu());
            setError(null);
          };
          script.onerror = () => {
            setError(new Error('Falha ao carregar o script Iugu'));
          };
          document.head.appendChild(script);
        }
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadScript().then();
  }, []);

  useEffect(() => {
    if (iuguInstance) {
      iuguInstance.setAccountID(accountId);
      iuguInstance.setTestMode(testMode);
    }
  }, [iuguInstance, accountId, testMode]);

  return { iugu: iuguInstance, error, isLoading };
};

export default useIugu;
