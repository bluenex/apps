import { ReactNode, useEffect, useRef } from "react";

interface TabOutsideDetectorProps {
  children: ReactNode;
  /** the id of the button or other element to trigger this area to popup */
  triggerId?: string;
  /** useCallback function or a function that is declared outside of the component */
  onTabOutside?: () => void;
}

const TabOutsideDetector = ({
  children,
  triggerId,
  onTabOutside,
}: TabOutsideDetectorProps) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLUnknownElement | null>(null);

  useEffect(() => {
    if (triggerId) {
      triggerRef.current = document.getElementById(triggerId);
    }

    const handler = (e: MouseEvent) => {
      // console.log("areaRef.current", areaRef.current);
      // console.log("triggerRef.current", triggerRef.current);
      // console.log("e.target", e.target);

      const doNothing =
        triggerRef.current === e.target ||
        triggerRef.current?.contains(e.target as Node) ||
        areaRef.current === e.target ||
        areaRef.current?.contains(e.target as Node);

      if (!doNothing) {
        onTabOutside?.();
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [onTabOutside, triggerId]);

  return <div ref={areaRef}>{children}</div>;
};

export default TabOutsideDetector;
