import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Startup {
  _id: string;
  name: string;
  industry: string;
  businessModel: string;
  stage: string;
  foundedDate: string;
}

export default async function StartupTable({
  startups,
}: {
  startups: Startup[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Business Model</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Founded Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {startups.map((startup) => (
          <TableRow key={startup._id}>
            <TableCell>{startup.name}</TableCell>
            <TableCell>{startup.industry}</TableCell>
            <TableCell>{startup.businessModel}</TableCell>
            <TableCell>{startup.stage}</TableCell>
            <TableCell>
              {new Date(startup.foundedDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/dashboard/my-startups/${startup._id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
