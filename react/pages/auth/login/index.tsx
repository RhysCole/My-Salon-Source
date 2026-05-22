import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { MetaData } from "@/components/MetaData";
import { ThemeToggleDropdown } from "@/components/ThemeToggleDropdown";
import { useAuth } from "@/hooks/useAuth"; // 2. Import your custom hook

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading, error } = useAuth();

    const handleLoginAction = (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(email, password);
    };

    return (
        <>
            <MetaData title="Login" />
            <div className="flex flex-col items-stretch p-6 md:p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <ThemeToggleDropdown
                        triggerClass="btn btn-circle btn-outline border-base-300"
                        dropdownClass="dropdown-end"
                    />
                </div>
                <h3 className="mt-8 text-center text-xl font-semibold md:mt-12 lg:mt-24">
                    Login
                </h3>
                <h3 className="text-base-content/70 mt-2 text-center text-sm">
                    Seamless Access, Secure Connection:
                </h3>

                {/* 5. Connect the form action */}
                <form action={handleLoginAction} className="mt-6 md:mt-10">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Address</legend>
                        <label className="input w-full focus:outline-0">
                            <span className="iconify lucide--mail text-base-content/80 size-5"></span>
                            <input
                                name="email"
                                className="grow focus:outline-0"
                                placeholder="Email Address"
                                type="email"
                                required
                            />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <label className="input w-full focus:outline-0">
                            <span className="iconify lucide--key-round text-base-content/80 size-5"></span>
                            <input
                                name="password"
                                className="grow focus:outline-0"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button.
                                type="button"
                                className="btn btn-xs btn-ghost btn-circle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                {showPassword ? (
                                    <span className="iconify lucide--eye-off size-4" />
                                ) : (
                                    <span className="iconify lucide--eye size-4" />
                                )}
                            </button>
                        </label>
                    </fieldset>

                    <div className="text-end">
                        <Link
                            className="label-text text-base-content/80 text-xs"
                            to="/auth/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* 6. Use the error state from the hook to display messages */}
                    {error && (
                        <div className="text-error mt-4 text-center text-sm">{error}</div>
                    )}

                    {/* 7. Change the Link to a submit button and use the isLoading state */}
                    <button
                        type="submit"
                        className="btn btn-primary btn-wide mt-4 max-w-full gap-3 md:mt-6"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <span className="iconify lucide--log-in size-4" />
                        )}
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-ghost btn-wide border-base-300 mt-4 max-w-full gap-3"
                    >
                        <img
                            src="/images/brand-logo/google-mini.svg"
                            className="size-6"
                            alt=""
                        />
                        Login with Google
                    </button>

                    <p className="text-base-content/80 mt-4 text-center text-sm md:mt-6">
                        Haven&apos;t account
                        <Link
                            className="text-primary ms-1 hover:underline"
                            to="/auth/register"
                        >
                            Create One
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
