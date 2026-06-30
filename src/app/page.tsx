import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    username === process.env.SITE_USERNAME &&
    password === process.env.SITE_PASSWORD
  ) {
    cookies().set("cannit_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/home");
  }

  redirect("/?error=1");
}

export default function SplashPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="min-h-screen bg-brand-light flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-10 w-4/5 max-w-[320px] sm:max-w-[260px]">
        <Image
          src="/logo.png"
          alt="Cann-It Dumpster Rentals"
          width={260}
          height={78}
          className="w-full h-auto mix-blend-multiply"
          priority
        />
        <p className="font-heading text-xl font-bold uppercase text-gray-400 mt-4 text-center w-full">
          YOU FILL IT, WE SPILL IT
        </p>
      </div>

      <form action={login} className="w-full max-w-sm space-y-3">
        {searchParams.error && (
          <p className="text-red-500 text-sm text-center">
            Invalid username or password.
          </p>
        )}
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          className="w-full bg-white border border-gray-300 text-brand-black placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full bg-white border border-gray-300 text-brand-black placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
        />
        <button
          type="submit"
          className="w-full bg-brand-orange hover:opacity-90 text-white font-bold uppercase tracking-wide py-3 rounded-lg transition-opacity"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
