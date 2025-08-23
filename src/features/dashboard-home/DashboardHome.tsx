/* eslint-disable @next/next/no-img-element */

import LoadingScreen from "@/components/LoadingScreen";
import PageHeading from "@/components/PageHeading";
import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardHome = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/startup/all/dashboard/home`,
    {
      method: "GET",
    }
  );

  const json: {
    data: {
      startups: {
        _id: string;
        coverImage: {
          data: Buffer;
          contentType: string;
          fileName: string;
        };
        name: string;
        foundedDate: string;
      }[];
    };
  } = await res.json();

  const { startups } = json.data;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>
        <div className="mb-8">
          <PageHeading>All Startups Created</PageHeading>
        </div>

        <div className="grid gap-6 laptopM:grid-cols-2 ">
          {startups.map((startup) => (
            <Card
              key={startup._id}
              className="overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader className="px-4">
                {startup.coverImage && (
                  <img
                    src={
                      startup?.coverImage?.data
                        ? `data:image/png;base64,${startup.coverImage.data}`
                        : ""
                    }
                    alt={startup.name}
                    className="h-60 w-full object-cover rounded-md"
                  />
                )}
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-lg font-semibold">
                  {startup.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Founded: {new Date(startup.foundedDate).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/home/${startup._id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardHome;
