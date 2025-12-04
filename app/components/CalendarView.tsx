"use client";

import { useState } from "react";
import {Alert, Card, Checkbox} from "flowbite-react";
import CopyButton from "./CopyButton";

interface CalendarViewProps {
  full_html: string;
  dropped_html: string;
  headers_ok: boolean;
}

export default function CalendarView({
                                       full_html,
                                       dropped_html,
                                       headers_ok
                                     }: CalendarViewProps) {
  const [drop, setDrop] = useState(true);
  const html = drop ? dropped_html : full_html;

  return (
    <>
      <Card className="max-w-5xl text-gray-900 w-full mt-2">
        <h2 className="text-gray-900 font-bold">Training calendar scraping</h2>
        <div>
          <Checkbox className="mx-2" checked={drop} onChange={() => setDrop(!drop)}/> Drop past events? (might help to disable if events seem to be missing)
        </div>
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
    </>
  );
}