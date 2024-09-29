import React from "react";
import Link from "next/link";
export default function PhishingNextButton() {
  return (
    <Link href={`/training/phishing/quiz`} className="mt-5">
      <button className="btn btn-ui">Next</button>
    </Link>
  );
}
