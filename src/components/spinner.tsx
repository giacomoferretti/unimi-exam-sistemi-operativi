import { cn } from "~/utils";

const segments = 12;

const getSpans = () => {
  return [...new Array<number>(segments)].map((_, index) => (
    <span
      key={`spinner-${index}`}
      className={cn(
        "absolute left-[-10%] top-[-3.9%] block h-[8%] w-[24%] translate-x-[146%] animate-spinner rounded-md bg-black",
        {
          "delay-[-1.2s] rotate-[0deg]": index === 0,
          "delay-[-1.1s] rotate-[30deg]": index === 1,
          "delay-[-1s] rotate-[60deg]": index === 2,
          "delay-[-0.9s] rotate-[90deg]": index === 3,
          "delay-[-0.8s] rotate-[120deg]": index === 4,
          "delay-[-0.7s] rotate-[150deg]": index === 5,
          "delay-[-0.6s] rotate-[180deg]": index === 6,
          "delay-[-0.5s] rotate-[210deg]": index === 7,
          "delay-[-0.4s] rotate-[240deg]": index === 8,
          "delay-[-0.3s] rotate-[270deg]": index === 9,
          "delay-[-0.2s] rotate-[300deg]": index === 10,
          "delay-[-0.1s] rotate-[330deg]": index === 11,
        },
      )}></span>
  ));
};

const Spinner: React.FC<React.ComponentPropsWithoutRef<"div">> = (props) => {
  return (
    <div className={cn("size-5")} {...props}>
      <div className="relative left-1/2 top-1/2 size-full">{getSpans()}</div>
    </div>
  );
};

export default Spinner;
