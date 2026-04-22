interface Props {
  label: string;
  value: string;
  icon:  string;
  color: 'green' | 'blue' | 'yellow' | 'red';
  sub?:  string;
}

const colorMap = {
  green:  'bg-green-50  border-green-200  text-green-700',
  blue:   'bg-blue-50   border-blue-200   text-blue-700',
  yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  red:    'bg-red-50    border-red-200    text-red-700',
};

export function StatCard({ label, value, icon, color, sub }: Props) {
  return (
    <div className={`card border ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-80">{label}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs mt-1 opacity-70">{sub}</p>}
    </div>
  );
}
