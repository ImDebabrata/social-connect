import { forwardRef } from "react";

interface PinInputProps {
  maxLength: number;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backSpaceFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prop_types?: string;
}

const PinInput = forwardRef<HTMLInputElement, PinInputProps>(
  ({ maxLength, onChangeFunc, backSpaceFunc, prop_types = "text" }, ref) => {
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 8 && !(e.target as HTMLInputElement).value) {
        backSpaceFunc(e as any);
      } else {
        onChangeFunc(e as any);
      }
    };

    return (
      <input
        type={prop_types === "text" ? "text" : "number"}
        ref={ref}
        onKeyUp={handleKeyUp}
        maxLength={maxLength}
      />
    );
  }
);

export default PinInput;
