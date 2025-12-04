import {get_html_full_events, parse_table} from "@/app/table";
import {arrays_equal} from "@/app/utils";
import type { Metadata } from 'next'
import React from "react";
import CalendarView from "@/app/components/CalendarView";

const expected_headers = ["Date", "Event name", "Duration, format", "Link"];

export const metadata: Metadata = {
  title: "SIH Training Calendar Scraper",
  description: "Simple web app for formatting our training events as HTML- for internal use"
}


export default async function Home() {
  const {headers, row_data: row_data_dropped} = await parse_table(true);
  const { row_data: row_data_full} = await parse_table(false);
  const headers_ok = arrays_equal(headers, expected_headers);
  const html_dropped = get_html_full_events(row_data_dropped);
  const html_full = get_html_full_events(row_data_full);

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-teal-600">
      <CalendarView full_html={html_full} dropped_html={html_dropped} headers_ok={headers_ok}/>
    </main>
  );
}
