import { ReactNode } from "react";

function BtnFooter({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen bg-foreground text-background hover:bg-gray-700 hover:text-white flex justify-center items-center cursor-pointer">
      <p className="uppercase px-auto py-3">{children}</p>
    </div>
  );
}

export default BtnFooter;
