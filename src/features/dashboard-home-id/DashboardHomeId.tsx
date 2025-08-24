import LoadingScreen from "@/components/LoadingScreen";
import PageHeading from "@/components/PageHeading";
import React, { Suspense } from "react";
import StartupForm from "../create-startup/StartupForm";

interface Props {
  id: string;
}

const DashboardHomeId: React.FC<Props> = async ({ id }) => {
  // VARS

  // FUNCTIONS

  const res = await fetch(
    `${process.env.BACKEND_URL}/startup/dashboard/home/${id}`,
    {
      method: "GET",
    }
  );

  const { data = {} } = await res.json();

  const { startup = {} } = data || {};

  const imageUrl = startup?.coverImage?.data
    ? `data:image/png;base64,${startup.coverImage.data}`
    : "";

  const pdfUrl = startup?.pitchDeck?.data
    ? `data:application/pdf;base64,${startup.pitchDeck.data}`
    : "";

  // JSX
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>
        <div className="mb-8">
          <PageHeading>Startup Details</PageHeading>
        </div>
        <StartupForm
          step={5}
          formReadonly={true}
          defaultValues={startup}
          coverImageUrl={imageUrl}
          pitchDeckUrl={pdfUrl}
          startupId={id}
          update={false}
        />
      </div>
    </Suspense>
  );
};

export default DashboardHomeId;
