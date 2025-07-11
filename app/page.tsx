import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session/session";


export default async function Home() {
  const session = await getSession()

  return (
    <main className="p-3 font-">
      <Button effect="gooeyLeft">{session.user?.id}</Button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
