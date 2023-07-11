import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center justify-center border-b border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 backdrop-blur-sm">
      <div className="flex w-full max-w-[1700px] items-center justify-between px-5">
        <span className="select-none text-4xl hue-rotate-[190deg]">😼</span>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md border border-slate-200 border-opacity-30 bg-white/10 px-4 py-2">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-5">
              <UserButton />
              <SignOutButton>
                <button className="rounded-md border border-slate-200 border-opacity-30 bg-white/10 px-4 py-2">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
