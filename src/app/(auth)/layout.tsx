import Header from "@/components/header";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="h-full flex items-center justify-center mt-10">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;