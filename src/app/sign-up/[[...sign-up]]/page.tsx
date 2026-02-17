import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <SignUp />
    </div>
  );
}
