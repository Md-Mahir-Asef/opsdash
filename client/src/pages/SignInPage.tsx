import { SignIn } from "@clerk/react-router";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-50 via-dark-100 to-dark-50 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <img
                        src="/logo-no-bg.png"
                        alt="OpsDash"
                        className="h-8 w-8"
                    />
                    <span className="text-xl font-bold text-dark-900">
                        OpsDash
                    </span>
                </div>
                <SignIn
                    afterSignOutUrl={"/dashboard"}
                />
            </div>
        </div>
    );
}
