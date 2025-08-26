'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { generateGradientColorsSequentially } from '@/helpers/generate-gradient-colors-sequentially';
import { Cell, Pie, PieChart } from 'recharts';

const TerpenePieChart = ({ terpeneData }) => {
  const filteredData = terpeneData
    .filter((item) => item.value !== null && item.value !== 0)
    .sort((a, b) => b.value - a.value);

  const colors = generateGradientColorsSequentially(filteredData.length);

  const chartData = filteredData.map((item, index) => ({
    name: item.name,
    value: item.value,
    fill: colors[index],
  }));

  const half = Math.ceil(chartData.length / 2);
  const leftData = chartData.slice(0, half);
  const rightData = chartData.slice(half);

  const chartConfig = {
    value: {
      label: 'value',
    },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 xl:flex-row xl:gap-12">
      {/* Chart First */}
      <div className="w-full flex-shrink-0 xl:order-2 xl:w-[550px]">
        <ChartContainer config={chartConfig} className="aspect-square">
          <PieChart>
            <defs>
              <linearGradient id="firstTwoGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00AF66" />
                <stop offset="100%" stopColor="#101820" />
              </linearGradient>
            </defs>

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Left Side Text pc mode */}
      <div className="hidden w-full pr-4 text-left xl:order-1 xl:block xl:w-auto">
        <h2 className="text-umbra-100 text-lg font-semibold">Terpene Breakdown</h2>
        <ul className="text-umbra-40 space-y-2 text-sm">
          {leftData.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.fill.includes('url(#firstTwoGradient)') ? '#101820' : item.fill,
                }}
              ></span>
              <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                {item.name} <span className="text-umbra-40"> {item.value}%</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Text pc mode */}
      <div className="hidden w-full text-left xl:order-3 xl:block xl:w-auto xl:pl-4">
        <h2 className="text-umbra-100 text-lg font-semibold">Terpene Breakdown</h2>
        <ul className="text-umbra-40 space-y-2 text-sm">
          {rightData.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.fill.includes('url(#firstTwoGradient)') ? '#101820' : item.fill,
                }}
              ></span>
              <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                {item.name} <span className="text-umbra-40"> {item.value}%</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Text sp mode */}
      <div className="flex w-full items-center justify-between p-6 text-center xl:order-2 xl:hidden">
        <ul className="text-umbra-40 space-y-2 text-sm">
          {leftData.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.fill.includes('url(#firstTwoGradient)') ? '#101820' : item.fill,
                }}
              ></span>
              <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                {item.name} <span className="text-umbra-40"> {item.value}%</span>
              </p>
            </li>
          ))}
        </ul>
        <ul className="text-umbra-40 space-y-2 text-sm">
          {rightData.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.fill.includes('url(#firstTwoGradient)') ? '#101820' : item.fill,
                }}
              ></span>
              <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                {item.name} <span className="text-umbra-40"> {item.value}%</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TerpenePieChart;
