import Header from "@/components/header";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <div>
                <Header />
            </div>
            {children}
        </div>
    );
}

export default DashboardLayout;