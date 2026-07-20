import TenantSidebar from "./TenantSidebar";

function TenantLayout({ children }) {
  return (
  <div className="min-h-screen bg-[#09090B] text-white">
    <TenantSidebar />
      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}

export default TenantLayout;