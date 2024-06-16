"use client"
import React from "react";
import {Alert, Button} from "flowbite-react";

export default function CopyButton() {
  const [show_message, set_show_message] = React.useState(false);
  function copy_html() {
    const output = document.querySelector("#html-output")!;
    navigator.clipboard.writeText(output.textContent!)
    set_show_message(true);
    setTimeout(() => {
      set_show_message(false);
    }, 2000)
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button className="max-w-md" data-copy-to-clipboard-target="html-output" size="md" onClick={() => copy_html()}>Copy
          HTML</Button>
        {show_message && <Alert className="max-w-md opacity-80" color="info">Copied!</Alert>}
      </div>
    </>
  )
}