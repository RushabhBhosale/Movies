export const StatCard = ({
  icon,
  label,
  value,
  color = "bg-white/20 border-white/30",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: string;
}) => (
  <div
    className={`flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-lg text-sm shadow-lg border transition-all hover:scale-105 ${color}`}
  >
    {icon} <span className="font-medium">{label}:</span>{" "}
    <span className="font-bold">{value}</span>
  </div>
);

export const InsightCard = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
    {icon}
    <span>{text}</span>
  </div>
);
