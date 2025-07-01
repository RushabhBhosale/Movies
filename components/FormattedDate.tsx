"use client";
import { useEffect, useState } from "react";

type Props = {
  date?: string | Date;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
};

export default function FormattedDate({
  date,
  format = { day: "2-digit", month: "2-digit", year: "numeric" },
  locale = "en-GB",
}: Props) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    const d = date ? new Date(date) : new Date();
    setFormatted(d.toLocaleDateString(locale, format));
  }, [date, locale, format]);

  return <span>{formatted}</span>;
}
