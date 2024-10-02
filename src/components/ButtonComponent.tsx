import React, { MouseEventHandler } from "react";
import BtnLoader from "./BtnLoader";
import { Button } from "./ui/button";

interface Props {
  styleType?: "primary" | "secondary" | "destructive";
  onClick?: MouseEventHandler | undefined;
  btnText?: string;
  type?: "button" | "submit";
  addtionalStyles?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

export const ButtonComponent = ({
  type = "submit",
  btnText,
  styleType = "primary",
  onClick,
  addtionalStyles,
  children,
  loading,
}: Props) => {
  const styleTypeClassess: any = {
    primary: "bg-primary",
    destructive: "bg-red-600",
  };

  return (
    <Button
      type={type}
      className={`${styleTypeClassess[styleType]} ${addtionalStyles}`}
      onClick={type === "button" ? onClick : undefined}
    >
      {loading ? (
        <BtnLoader />
      ) : (
        <>
          {btnText} {children}
        </>
      )}
    </Button>
  );
};

ButtonComponent.propTypes = {
  onClick: function (props: any, propName: string) {
    if (props["type"] === "submit" && props[propName] !== undefined) {
      return new Error(
        "Please remove onClick function when the button type is submit"
      );
    }
    if (props["type"] === "button" && props[propName] === undefined) {
      return new Error("Please provide a onClick function!");
    }
    if (props["type"] === "button" && typeof props[propName] !== "function") {
      return new Error("onClick must be a function!");
    }
  },
};
