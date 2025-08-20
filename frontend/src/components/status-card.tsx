import React from "react";
import { ShoppingCart, Box, PackageCheck, PackageX } from "lucide-react";

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md shadow-md border border-white/10 w-full hover:bg-white/10 transition">
    <div className="bg-white/10 p-3 rounded-xl text-white">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  </div>
);

const StatsCardGroup = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard icon={Box} title="Total Products" value={stats.totalProducts} />
      <StatCard icon={ShoppingCart} title="Total Orders" value={stats.totalOrders} />
      <StatCard icon={PackageX} title="Products Left" value={stats.productLeft} />
      <StatCard icon={PackageCheck} title="Sold Products" value={stats.soldProducts} />
    </div>
  );
};

export default StatsCardGroup;
