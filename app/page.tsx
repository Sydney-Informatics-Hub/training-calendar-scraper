import {get_html_full_events, parse_table} from "@/app/table";
import {arrays_equal} from "@/app/utils";
import {Alert, Card} from "flowbite-react";

const expected_headers = ["Date", "Event name", "Duration, format", "Link"];
const drop_past_events = true;


export default async function Home() {
  const {headers, row_data} = await parse_table(drop_past_events);
  const headers_ok = arrays_equal(headers, expected_headers);
  const html = get_html_full_events(row_data);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Card className="max-w-5xl text-gray-900 w-full mt-2">
        <h2 className="text-gray-900">Training calendar scraping</h2>
        {drop_past_events && <Alert color="info">Past events have been automatically dropped</Alert>}
        {headers_ok ? "Table headers look OK ✅" : "Headers don't match what expect - did the table format change?"}
      </Card>
      <Card className="max-w-5xl w-full mt-2 text-gray-900 overflow-scroll">
        <h2>HTML for events</h2>
        <pre className="text-xs">{html}</pre>
      </Card>
      <Card className="max-w-5xl w-full mt-2 text-gray-900">
        <h2>Preview</h2>
        <div
          dangerouslySetInnerHTML={{__html: html}}
        />
      </Card>

    </main>
  );
}
