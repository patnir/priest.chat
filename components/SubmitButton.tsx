import { useEffect, useRef } from "react";

export const SubmitButton = (
  message: string,
  onClick: any,
  disabled: boolean,
  className: string
): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };

    window.addEventListener("keydown", handleEnter);

    // Cleanup: remove event listener when component is unmounted
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <button
      disabled={disabled}
      ref={buttonRef}
      onClick={onClick}
      className={className}
    >
      {message}
    </button>
  );
};
