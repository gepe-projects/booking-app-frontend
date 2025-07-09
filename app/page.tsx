import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/auth";


export default async function Home() {
  const session = await auth()

  return (
    <main className="p-3 font-">
      <Button effect="gooeyLeft">{session?.user.id}</Button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
