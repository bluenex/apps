import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

const Button = (
  btnProps: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button
      {...btnProps}
      className={twMerge(
        "active:scale-95",
        "disabled:active:scale-100",
        btnProps.className,
      )}
    />
  );
};

export default Button;
