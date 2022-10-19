import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import colors from "tailwindcss/colors";
import { FundContribution } from "../../pages/fund/[address]";
import truncateEthAddress from "../../utils/truncateEthAddress";

const COLORS = Object.values(colors.blue);

const renderCustomizedLabel = ({ cx, cy, percent, name, x, y }) => {
  return (
    <text
      fill={colors.blue[700]}
      stroke="none"
      cx={cx}
      cy={cy}
      name={name}
      x={x}
      y={y}
      alignmentBaseline="middle"
      className="recharts-text recharts-pie-label-text font-bold"
      textAnchor={x > cx ? "start" : "end"}
    >
      <tspan x={x} dy="0em">
        {`${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const CustomTooltip = ({
  active,
  payload,
  tokenSymbol,
}: TooltipProps<ValueType, NameType> & { tokenSymbol: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="background p-4 rounded-lg shadow-lg">
        <span className="font-bold">
          {truncateEthAddress(payload[0].payload.address)}:{" "}
        </span>
        <span>
          {(payload[0].value as number).toFixed(8)} {tokenSymbol}
        </span>
      </div>
    );
  }
  return null;
};

interface FundDistributionChartProps {
  data: FundContribution[];
  tokenSymbol: string;
}

const FundDistributionChart = ({
  data,
  tokenSymbol,
}: FundDistributionChartProps) => {
  return (
    <div className="py-4 mb-4 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            outerRadius={80}
            innerRadius={40}
            label={renderCustomizedLabel}
            labelLine={false}
            fill={colors.blue[600]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[(COLORS.length - index - 1) % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} tokenSymbol={tokenSymbol} />
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundDistributionChart;
