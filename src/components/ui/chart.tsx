"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

// ----------------------
// Local relaxed typings
// ----------------------
type AnyRechartsPayload = {
  [key: string]: any;
  payload?: Record<string, any>;
  value?: number | string;
  name?: string;
  dataKey?: string;
  color?: string;
};

// This replaces the old Recharts Payload type
interface ChartLegendPayload {
  dataKey?: string;
  color?: string;
  value?: string;
  payload?: Record<string, any>;
}

interface LooseTooltipProps
  extends Omit<
    React.ComponentProps<typeof RechartsPrimitive.Tooltip>,
    "payload" | "label"
  > {
  payload?: AnyRechartsPayload[];
  label?: any;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  color?: string;
  className?: string;
}

// no longer extends LegendProps to avoid HTMLAttributes clash
interface LooseLegendProps
  extends React.HTMLAttributes<HTMLDivElement> {
  payload?: ChartLegendPayload[];
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: "top" | "middle" | "bottom";
}

// ----------------------
// Theme + context
// ----------------------
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

// ----------------------
// Container & styling
// ----------------------
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// ----------------------
// Tooltip
// ----------------------
const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: LooseTooltipProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }
    return value ? (
      <div className={cn("font-medium", labelClassName)}>{value}</div>
    ) : null;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              key={item.dataKey ?? index}
              className="flex w-full items-center gap-2"
            >
              {!hideIndicator && (
                <div
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                {item.value && (
                  <span className="font-mono font-medium">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------
// Legend
// ----------------------
const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: LooseLegendProps) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, i) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value ?? i} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// ----------------------
// Helper
// ----------------------
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: AnyRechartsPayload,
  key: string
) {
  const payloadPayload =
    payload?.payload && typeof payload.payload === "object"
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;
  if (key in payload && typeof (payload as any)[key] === "string") {
    configLabelKey = (payload as any)[key];
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof (payloadPayload as any)[key] === "string"
  ) {
    configLabelKey = (payloadPayload as any)[key];
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

// ----------------------
// Exports
// ----------------------
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

