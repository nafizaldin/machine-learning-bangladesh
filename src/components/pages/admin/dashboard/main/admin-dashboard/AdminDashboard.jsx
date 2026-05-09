"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { ArrowUpRight } from "lucide-react"

const data = [
  { month: "Jan", active: 25000, new: 10000, date: "2023-01-15" },
  { month: "Feb", active: 10000, new: 5000, date: "2023-02-15" },
  { month: "Mar", active: 40000, new: 20000, date: "2023-03-15" },
  { month: "Apr", active: 70000, new: 40000, date: "2023-04-15" },
  { month: "May", active: 100000, new: 60000, date: "2023-05-15" },
  { month: "Jun", active: 125200, new: 70000, date: "2023-06-21" },
  { month: "Jul", active: 105000, new: 50000, date: "2023-07-15" },
  { month: "Aug", active: 160000, new: 80000, date: "2023-08-15" },
  { month: "Sep", active: 180000, new: 90000, date: "2023-09-15" },
  { month: "Oct", active: 140000, new: 60000, date: "2023-10-15" },
  { month: "Nov", active: 170000, new: 80000, date: "2023-11-15" },
  { month: "Dec", active: 200000, new: 100000, date: "2023-12-15" },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dateObj = new Date(payload[0].payload.date)
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    return (
      <div className="bg-white px-6 py-3 rounded-full text-[#191919] shadow-lg border border-gray-200">
        <p className="text-lg font-bold flex gap-2">
          {payload[0].value.toLocaleString()}
          <span className="text-green-600 text-[0.625rem] px-1 py-[0.125rem] flex items-center border-[0.6px] border-green-200 bg-green-100 rounded-full">
            <ArrowUpRight size={14} className="mr-1" /> 12.5%
          </span>
        </p>
        <p className="text-gray-500 text-sm pt-1">{formattedDate}</p>
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  return (
    <div className="bg-white text-[#191919] p-6 rounded-xl w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-[0.75rem] text-gray-500">User’s</p>
          <h2 className="text-[1.5rem] font-semibold">Traffic Overview</h2>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-[0.75rem] text-gray-500">User’s Active</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">125.2k</p>
              <span className="flex items-center text-green-600 text-sm font-medium border-[0.6px] border-green-200 bg-green-100 rounded-full text-[0.625rem] px-1 py-[0.125rem]">
                12.5% <ArrowUpRight size={14} className="mr-1" />
              </span>
            </div>
          </div>
          <div>
            <p className="text-[0.75rem] text-gray-500">New User’s</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">6.3k</p>
              <span className="flex items-center text-green-600 text-sm font-medium border-[0.6px] border-green-200 bg-green-100 rounded-full text-[0.625rem] px-1 py-[0.125rem]">
                12.5% <ArrowUpRight size={14} className="mr-1" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[24.625rem] py-5">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#E5E7EB" vertical={false} /> {/* light gray */}

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              stroke="#9CA3AF"
              dy={10}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#9CA3AF"
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-20}
              tick={{ fontSize: "12px" }}
            />

            <Tooltip content={<CustomTooltip />} shared={false} />

            <Area
              type="natural"
              dataKey="active"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorActive)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="natural"
              dataKey="new"
              stroke="#a855f7"
              fillOpacity={1}   
              fill="url(#colorNew)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
