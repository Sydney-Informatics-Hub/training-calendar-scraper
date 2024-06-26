import {get_html_full_events, parse_table} from "@/app/table";
import {arrays_equal} from "@/app/utils";
import {Alert, Card} from "flowbite-react";
import type { Metadata } from 'next'
import CopyButton from "@/app/components/CopyButton";

const expected_headers = ["Date", "Event name", "Duration, format", "Link"];
const drop_past_events = true;

export const metadata: Metadata = {
  title: "SIH Training Calendar Scraper",
  description: "Simple web app for formatting our training events as HTML- for internal use"
}


export default async function Home() {
  const {headers, row_data} = await parse_table(drop_past_events);
  const headers_ok = arrays_equal(headers, expected_headers);
  const html = get_html_full_events(row_data);

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-teal-600">
      <Card className="max-w-5xl text-gray-900 w-full mt-2">
        <h2 className="text-gray-900 font-bold">Training calendar scraping</h2>
        {drop_past_events && <Alert color="info" className="max-w-lg">ℹ️ Past events have been automatically dropped</Alert>}
        {headers_ok ? <Alert color="info" className="max-w-lg">✅ Table headers look OK</Alert> : <Alert color="danger">Headers don&apos;t match what expect - did the table format change?</Alert>}
      </Card>
      <Card className="max-w-5xl w-full mt-2 text-gray-900 overflow-scroll">
        <h2 className="font-bold text-xl">HTML for events</h2>
        <hr/>
        <CopyButton/>
        <pre id="html-output" className="text-xs bg-gray-100 overflow-x-scroll p-2 font-mono">{html}</pre>
      </Card>
      <Card className="max-w-5xl w-full mt-2 text-gray-900">
        <h2 className="font-bold text-xl">Preview</h2>
        <hr/>
        <div
          dangerouslySetInnerHTML={{__html: html}}
        />
      </Card>

    </main>
  );
}
