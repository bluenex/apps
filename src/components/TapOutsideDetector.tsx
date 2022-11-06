import { ReactNode, useEffect, useRef } from "react";

interface TapOutsideDetectorProps {
  children: ReactNode;
  /** the id of the button or other element to trigger this area to popup */
  triggererId?: string;
  /** useCallback function or a function that is declared outside of the component */
  onTapOutside?: () => void;
}

const TapOutsideDetector = ({
  children,
  triggererId,
  onTapOutside,
}: TapOutsideDetectorProps) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLUnknownElement[]>([]);

  useEffect(() => {
    if (triggererId) {
      triggerRef.current = Array.from(
        document.querySelectorAll(`#${triggererId}`),
      );
    }

    const handler = (e: MouseEvent) => {
      const doNothing =
        triggerRef.current.includes(e.target as HTMLUnknownElement) ||
        triggerRef.current.some((x) => x?.contains(e.target as Node)) ||
        areaRef.current === e.target ||
        areaRef.current?.contains(e.target as Node);

      if (!doNothing) {
        onTapOutside?.();
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [onTapOutside, triggererId]);

  return <div ref={areaRef}>{children}</div>;
};

export default TapOutsideDetector;
