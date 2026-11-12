import cybergysLogo from "../../assets/cybergys-logo-dark.png";

function Logo() {
  return (
    <div className="flex h-[96px] items-center justify-center px-2 py-1">
      <img src={cybergysLogo} alt="Cybergys Technologies" className="h-auto w-[185px] max-w-full object-contain" />
    </div>
  );
}

export default Logo;
