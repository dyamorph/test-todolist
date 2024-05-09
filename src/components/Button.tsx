interface Props {
  onClick: (e: React.FormEvent) => void;
  className?: string;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Props> = ({ onClick, className, text, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-600 text-white hover:bg-violet-700 shadow-md text-md`}
    >
      {text}
    </button>
  );
};

export default Button;
