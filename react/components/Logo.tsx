import logoDark from "@/assets/logo/logo-dark.png";
import logoLight from "@/assets/logo/logo-light.png";

type ILogo = {
    className?: string;
};

export const Logo = ({ className }: ILogo) => {
    return (
      <>
        <img
          src={logoDark}
          alt="logo-dark"
          className={`hidden h-5 dark:inline ${className ?? ""}`}
        />
        <img
          src={logoLight}
          alt="logo-light"
          className={`h-5 dark:hidden ${className ?? ""}`}
        />
      </>
    );
};
