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
    <main className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h1 className="font-heading text-7xl md:text-9xl font-extrabold uppercase leading-none tracking-tight text-white">
          CANN-<span className="text-brand-amber">IT</span>
        </h1>
        <p className="font-heading text-2xl md:text-4xl font-extrabold uppercase text-gray-400 tracking-widest mt-4">
          YOU FILL IT, WE SPILL IT
        </p>
      </div>

      <form action={login} className="w-full max-w-sm space-y-3">
        {searchParams.error && (
          <p className="text-red-400 text-sm text-center">
            Invalid username or password.
          </p>
        )}
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          className="w-full bg-brand-dark border border-gray-700 text-white placeholder-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-amber transition-colors"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full bg-brand-dark border border-gray-700 text-white placeholder-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-amber transition-colors"
        />
        <button
          type="submit"
          className="w-full bg-brand-amber hover:bg-amber-400 text-brand-black font-bold uppercase tracking-wide py-3 rounded-lg transition-colors"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
