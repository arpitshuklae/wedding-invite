import { Suspense } from "react";
import { InvitationExperience } from "@/components/invitation-experience";
import { OpenEnvelope } from "@/components/open-envelope";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const envelope = String(query.envelope || query.gate || "");
  const capture = envelope === "slid" || envelope === "opening";

  return (
    <>
      <OpenEnvelope state={capture ? "sliding" : "closed"} capture={capture} />
      <Suspense>
        <InvitationExperience />
      </Suspense>
    </>
  );
}
