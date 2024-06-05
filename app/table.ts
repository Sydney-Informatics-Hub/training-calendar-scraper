import { JSDOM } from "jsdom";
import { parse } from "date-fns";

/** Grab the HTML for the training calendar page
 * and parse it using jsdom
 */
async function get_page() {
  const page = await fetch(
    "https://www.sydney.edu.au/research/facilities/sydney-informatics-hub/workshops-and-training/training-calendar.html",
    { mode: "no-cors" },
  ).then((response: Response) => {
    return response.text()!;
  });
  const dom = new JSDOM(page);
  return dom.window.document;
}

/**
 * Grab the table of events from the page. Currently this
 * is the only table on the page, so we can just select
 * by looking for a table with rows
 */
export async function get_table() {
  const page = await get_page();
  return page.querySelector("table:has(tr)")!;
}

interface EventEntry {
  date_text: string;
  date: Date;
  event_name: string;
  duration_format: string;
  link: string;
  duration: number;
}

/** Get the duration of the event as the number of hours.
 * Currently all events are listed with "1.5h" or similar,
 * so we don't need to do too much complex parsing
 */
function parse_duration(duration: string): number {
  const duration_pattern = /(\d+(\.\d+)?)\s?h/;
  const match = duration_pattern.exec(duration)![1];
  return parseFloat(match);
}

/** Extract event information from a single row of the table */
function parse_row(row: string[]): EventEntry {
  // If it's a multi-day event, with a date like "4 - 5 July", grab
  //   the first number and treat it as "4 July"
  const multi_date_pattern = /(\d+)\s?-\s?\d+/;
  const date_string = row[0].replace(multi_date_pattern, "$1");
  const date = parse(date_string, "d MMMM", new Date());
  return {
    date_text: row[0].trim(),
    date: date,
    event_name: row[1],
    duration_format: row[2],
    link: row[3],
    duration: parse_duration(row[2]),
  };
}

/** Parse the full events table
 */
export async function parse_table(drop_past_events: boolean) {
  const table = await get_table();
  // Table headers are currently not in a <th> tag: just in the first <tr> row
  const header = table.querySelector("tr:first-of-type")!;
  const headers = Array.from(header.children)
    .map((el) => el.textContent!)
    .map((s) => s.trim());
  const rows = Array.from(table.querySelectorAll("tr:not(:first-of-type)")!);
  let row_data: EventEntry[] = rows
    .map((row) => {
      return Array.from(row.querySelectorAll("td")).map((el) => {
        // The "link" column sometimes might just have text, if no link has been created yet
        const link = el.querySelector("a");
        if (link !== null) {
          return link.href;
        }
        return el.textContent || "";
      });
    })
    .map((cells) => parse_row(cells))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  if (drop_past_events) {
    row_data = row_data.filter((event) => event.date >= new Date());
  }
  return { headers, row_data };
}

/** Format an individual event as HTML */
function event_to_html(event: EventEntry): string {
  let link: string;
  if (event.link.startsWith("http")) {
    link = `<a href="${event.link}">${event.event_name}</a>`;
  } else {
    link = event.event_name.trim();
  }
  return `<b>${event.date_text}</b>: ${link}`;
}

/** Split events into short/medium/long and format them as HTML */
export function get_html_entries(events: EventEntry[]) {
  const short_events = events.filter((e) => e.duration <= 2).map(event_to_html);
  const medium_events = events
    .filter((e) => e.duration > 2 && e.duration <= 4)
    .map(event_to_html);
  const long_events = events.filter((e) => e.duration > 4).map(event_to_html);
  return { short_events, medium_events, long_events };
}

/** Output the final HTML for the newsletter: headings for short/medium/long events, followed by the events */
export function get_html_full_events(events: EventEntry[]) {
  let full_html: string = "";
  const { short_events, medium_events, long_events } = get_html_entries(events);
  if (short_events.length > 0) {
    full_html =
      full_html +
      `
<h4>Short training (2 hours or less)</h4>
${short_events.map((s) => s + "<br />").join("\n")}`;
  }
  if (medium_events.length > 0) {
    full_html =
      full_html +
      `
<h4>Half-day training (3-4 hours)</h4>
${medium_events.map((s) => s + "<br />").join("\n")} `;
  }
  if (long_events.length > 0) {
    full_html =
      full_html +
      `
<h4>Full day training (or 2 half-days)</h4>
${long_events.map((s) => s + "<br />").join("\n")}`;
  }
  return full_html;
}
