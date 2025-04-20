'use client';

import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
};

const TerpenePieChart = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-12">
      {/* Left Side */}
      <div className="pr-4 text-left">
        <h2 className="text-lg font-semibold text-gray-700">Left Side Text</h2>
        <ul className="list-inside list-disc text-sm text-gray-500">
          {chartData.map((item) => (
            <li key={item.browser}>
              {item.browser.charAt(0).toUpperCase() + item.browser.slice(1)}: {item.visitors}
            </li>
          ))}
        </ul>
      </div>

      {/* Chart in the middle */}
      <div className="w-[550px] flex-shrink-0">
        <ChartContainer config={chartConfig} className="aspect-square">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} label />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Right Side */}
      <div className="pl-4 text-left">
        <h2 className="text-lg font-semibold text-gray-700">Right Side Text</h2>
        <ul className="list-inside list-disc text-sm text-gray-500">
          {chartData.map((item) => (
            <li key={item.browser}>
              {item.browser.charAt(0).toUpperCase() + item.browser.slice(1)}: {item.visitors}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TerpenePieChart;
