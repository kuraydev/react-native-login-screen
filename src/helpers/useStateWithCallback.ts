import {
  useRef,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";

type Callback<T> = (value: T) => void;
type DispatchWithCallback<A, T> = (value: A, callback?: Callback<T>) => void;

function useStateWithCallback<T>(
  initialState: T | (() => T),
): [T, DispatchWithCallback<SetStateAction<T>, T>] {
  const [state, setStateInternal] = useState<T>(initialState);

  const callbackRef = useRef<Callback<T> | undefined>(undefined);
  const isFirstCallbackCall = useRef<boolean>(true);

  const setState = useCallback(
    (setStateAction: SetStateAction<T>, callback?: Callback<T>): void => {
      callbackRef.current = callback;
      setStateInternal(setStateAction);
    },
    [],
  );

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false;
      return;
    }
    callbackRef.current?.(state);
  }, [state]);

  return [state, setState];
}

export default useStateWithCallback;
