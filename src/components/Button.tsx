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
      className={twMerge("active:scale-95", btnProps.className)}
    />
  );
};

export default Button;
