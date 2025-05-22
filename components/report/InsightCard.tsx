{/*  components/report/InsightCard.tsx */}

import { Card } from "../ui/card";

{/*  Updated type for InsightCardProps to match report/page.tsx usage */}
interface InsightCardProps {
  data: {
    tags: string[];
    dominant: string;
  };
}

const InsightCard = ({ data }: InsightCardProps) => {
  return (
    <Card className="shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold">Your Taste Insights</h2>

      <div>
        <p className="text-muted-foreground">
          <strong>Dominant Trait:</strong> {data.dominant || "N/A"}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">
          <strong>Tags:</strong>{" "}
          {Array.isArray(data.tags) && data.tags.length > 0
            ? data.tags.join(", ")
            : "None"}
        </p>
      </div>
    </Card>
  );
};

export default InsightCard;

{/*  import { Card } from "../ui/card"; */}
{/*  import { Table } from "../ui/table"; */}

{/*  // Define the type for each item in the data array */}
{/*  interface InsightDataItem { */}
{/*    showdownId: string; */}
{/*    showdownName: string; */}
{/*    voteCount: number; */}
{/*    winningOption: string; */}
{/*  } */}

{/*  // Define the type for the props */}
{/*  interface InsightCardProps { */}
{/*    data: InsightDataItem[]; // 'data' is an array of InsightDataItem objects */}
{/*  } */}

{/*  const InsightCard = ({ data }: InsightCardProps) => { */}
{/*    return ( */}
{/*      <Card className="shadow-md"> */}
{/*        <h2 className="text-xl font-bold">Your Voting Insights</h2> */}
{/*        <Table className="mt-4"> */}
{/*          <thead> */}
{/*            <tr> */}
{/*              <th>Showdown</th> */}
{/*              <th>Votes</th> */}
{/*              <th>Winning Option</th> */}
{/*            </tr> */}
{/*          </thead> */}
{/*          <tbody> */}
{/*            {data.map((item) => ( */}
{/*              <tr key={item.showdownId}> */}
{/*                <td>{item.showdownName}</td> */}
{/*                <td>{item.voteCount}</td> */}
{/*                <td>{item.winningOption}</td> */}
{/*              </tr> */}
{/*            ))} */}
{/*          </tbody> */}
{/*        </Table> */}
{/*      </Card> */}
{/*    ); */}
{/*  }; */}

{/*  export default InsightCard; */}
