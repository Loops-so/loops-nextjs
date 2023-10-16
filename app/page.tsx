"use client";

import { useState } from "react";

export default function Page() {

  const [email, setEmail] = useState<string>("");
  const [results, setResults] = useState<string>("");

  async function addOrUpdateContact() {
    if (email == "") return;
    const resp = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify({ email }) // extra contact properties can be sent in the JSON too
    });
    const data = await resp.json();
    setResults(JSON.stringify(data["data"], null, 4));
  }

  async function findContact() {
    if (email == "") return;
    const params = new URLSearchParams({ q: email }).toString();
    const resp = await fetch(`/api/contacts?${params}`);
    const data = await resp.json();
    setResults(JSON.stringify(data["data"], null, 4));
  }

  async function deleteContact() {
    if (email == "") return;
    const params = new URLSearchParams({ email }).toString();
    const resp = await fetch(`/api/contacts?${params}`, { method: "DELETE" });
    const data = await resp.json();
    setResults(JSON.stringify(data["data"], null, 4));
  }

  return (
    <main className="p-8 max-w-lg">
      <h1 className="font-bold text-2xl">Loops SDK Tester</h1>
      <p className="my-4">
        <input
          type="email" name="email" placeholder="Email address"
          className="p-2 w-full border rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p className="my-4">
        <button onClick={addOrUpdateContact} className="px-4 py-2 rounded-md bg-green-600 text-white">Add contact</button> &nbsp; 
        <button onClick={findContact} className="px-4 py-2 rounded-md bg-blue-600 text-white">Find contact</button> &nbsp; 
        <button onClick={deleteContact} className="px-4 py-2 rounded-md bg-red-600 text-white">Delete contact</button>
      </p>
      <pre className="mt-8 w-full overflow-scroll">{results}</pre>
    </main>
  )
}
