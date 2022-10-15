import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import colors from "tailwindcss/colors";
import { FundContribution } from "../../pages/fund/[address]";

const COLORS = Object.values(colors.blue);

/*
  Label props
  {
      "fill": "#3b82f6",
      "stroke": "none",
      "cx": 473.5,
      "cy": 134,
      "percent": 0.1786179436609236,
      "name": "Group F",
      "tooltipPayload": [
          {
              "name": "Group F",
              "value": 4800,
              "payload": {
                  "payload": {
                      "name": "Group F",
                      "value": 4800
                  },
                  "fill": "#3b82f6",
                  "stroke": "#fff",
                  "cx": "50%",
                  "cy": "50%",
                  "name": "Group F",
                  "value": 4800
              },
              "dataKey": "value"
          }
      ],
      "midAngle": 327.84877014103375,
      "middleRadius": 60,
      "tooltipPosition": {
          "x": 524.2987866137187,
          "y": 165.92934823283866
      },
      "payload": {
          "payload": {
              "name": "Group F",
              "value": 4800
          },
          "fill": "#3b82f6",
          "stroke": "#fff",
          "cx": "50%",
          "cy": "50%",
          "name": "Group F",
          "value": 4800
      },
      "value": 4800,
      "innerRadius": 40,
      "outerRadius": 80,
      "maxRadius": 485.9354380985194,
      "startAngle": 295.6975402820675,
      "endAngle": 360,
      "paddingAngle": 0,
      "index": 5,
      "textAnchor": "start",
      "x": 558.1646443561978,
      "y": 187.21558038806444
  }
   */

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
      className="recharts-text recharts-pie-label-text"
      textAnchor={x > cx ? "start" : "end"}
    >
      <tspan x={x} dy="0em">
        {`${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <span className="font-bold">{payload[0].name}: </span>
        <span>{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

interface FundDistributionChartProps {
  data: FundContribution[];
}

const FundDistributionChart = ({ data }: FundDistributionChartProps) => {
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
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[(COLORS.length - index - 1) % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundDistributionChart;
