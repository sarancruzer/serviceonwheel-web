"use client";

import { useEffect, useMemo, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { setClientSession } from "@/lib/auth/client";
import {
  buildDemoSession,
  getDefaultRouteForRole,
  type AppRole,
} from "@/lib/auth/shared";

type AuthModalType = "login" | "signup";

type LoginFormValues = {
  password: string;
  role: AppRole;
  username: string;
};

type SignupFormValues = {
  agree: boolean;
  email: string;
  firstName: string;
  password: string;
  phone?: string;
};

type AuthSessionSeed = Omit<Parameters<typeof buildDemoSession>[0], "role">;

function buildUrl(pathname: string, searchParams: URLSearchParams) {
  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function AuthModals() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticating, startAuthTransition] = useTransition();

  const activeModal = useMemo<AuthModalType | null>(() => {
    const auth = searchParams.get("auth");

    if (auth === "login" || auth === "signup") {
      return auth;
    }

    return null;
  }, [searchParams]);

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      password: "",
      role: "customer",
      username: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      agree: false,
      email: "",
      firstName: "",
      password: "",
      phone: undefined,
    },
  });

  const setModal = (type: AuthModalType | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type !== activeModal) {
      loginForm.reset();
      signupForm.reset();
    }

    if (type) {
      params.set("auth", type);
    } else {
      params.delete("auth");
    }

    router.replace(buildUrl(pathname, params), { scroll: false });
  };

  const completeAuthentication = (
    role: AppRole,
    sessionParams: AuthSessionSeed,
  ) => {
    const session = buildDemoSession({ ...sessionParams, role });

    setClientSession(session);
    loginForm.reset();
    signupForm.reset();
    router.replace(getDefaultRouteForRole(role));
    router.refresh();
  };

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModal, pathname, searchParams, router]);

  if (!activeModal) {
    return null;
  }

  return (
    <>
      <div
        className="modal-backdrop fade show sow-auth-backdrop"
        onClick={() => setModal(null)}
        aria-hidden="true"
      />

      <div
        className="modal fade show sow-auth-modal d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${activeModal}-modal-title`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-end pb-0 border-0">
              <button
                type="button"
                className="sow-auth-close"
                aria-label="Close"
                onClick={() => setModal(null)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            {activeModal === "login" ? (
              <div className="modal-body p-4 p-lg-5">
                <form
                  onSubmit={loginForm.handleSubmit(async (values) => {
                    startAuthTransition(() => {
                      completeAuthentication(values.role, {
                        username: values.username,
                      });
                    });
                  })}
                >
                  <div className="text-center mb-3">
                    <h3 className="mb-2" id="login-modal-title">
                      Welcome
                    </h3>
                    <p>Enter your credentials to access your account</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-username">
                      User Name
                    </label>
                    <input
                      id="login-username"
                      type="text"
                      className="form-control"
                      {...loginForm.register("username", {
                        required: "User name is required",
                      })}
                    />
                    {loginForm.formState.errors.username ? (
                      <div className="text-danger small mt-1">
                        {loginForm.formState.errors.username.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-role">
                      Workspace
                    </label>
                    <select
                      id="login-role"
                      className="form-select"
                      {...loginForm.register("role", {
                        required: "Workspace is required",
                      })}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                    {loginForm.formState.errors.role ? (
                      <div className="text-danger small mt-1">
                        {loginForm.formState.errors.role.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <label className="form-label" htmlFor="login-password">
                        Password
                      </label>
                      <Link
                        href="/contact"
                        className="text-primary fw-medium text-decoration-underline mb-1 fs-14"
                        onClick={() => setModal(null)}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <input
                      id="login-password"
                      type="password"
                      className="form-control"
                      {...loginForm.register("password", {
                        minLength: {
                          message: "Password must be at least 6 characters",
                          value: 6,
                        },
                        required: "Password is required",
                      })}
                    />
                    {loginForm.formState.errors.password ? (
                      <div className="text-danger small mt-1">
                        {loginForm.formState.errors.password.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember_me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember_me"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="otp_signin"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="otp_signin"
                        >
                          Sign in with OTP
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-lg btn-linear-primary w-100"
                      disabled={
                        loginForm.formState.isSubmitting || isAuthenticating
                      }
                    >
                      {loginForm.formState.isSubmitting || isAuthenticating
                        ? "Signing In..."
                        : "Sign In"}
                    </button>
                  </div>

                  <div className="login-or mb-3">
                    <span className="span-or">Or sign in with </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <button
                      type="button"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-3"
                    >
                      <img
                        src="/assets/img/icons/google-icon.svg"
                        className="me-2"
                        alt="Google"
                      />
                      Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                    >
                      <img
                        src="/assets/img/icons/fb-icon.svg"
                        className="me-2"
                        alt="Facebook"
                      />
                      Facebook
                    </button>
                  </div>

                  <div className="d-flex justify-content-center">
                    <p className="mb-0">
                      Don&apos;t have a account?{" "}
                      <button
                        type="button"
                        className="text-primary sow-auth-switch"
                        onClick={() => setModal("signup")}
                      >
                        Join us Today
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="modal-body p-4 p-lg-5">
                <form
                  onSubmit={signupForm.handleSubmit(async (values) => {
                    startAuthTransition(() => {
                      completeAuthentication("customer", {
                        email: values.email,
                        name: values.firstName,
                      });
                    });
                  })}
                >
                  <div className="text-center mb-3">
                    <h3 className="mb-2" id="signup-modal-title">
                      Registration
                    </h3>
                    <p>Enter your credentials to access your account</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="signup-first-name">
                      First Name
                    </label>
                    <input
                      id="signup-first-name"
                      type="text"
                      className="form-control"
                      {...signupForm.register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {signupForm.formState.errors.firstName ? (
                      <div className="text-danger small mt-1">
                        {signupForm.formState.errors.firstName.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="signup-email">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      className="form-control"
                      {...signupForm.register("email", {
                        pattern: {
                          message: "Enter a valid email",
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        },
                        required: "Email is required",
                      })}
                    />
                    {signupForm.formState.errors.email ? (
                      <div className="text-danger small mt-1">
                        {signupForm.formState.errors.email.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="signup-phone">
                      Phone Number
                    </label>
                    <Controller
                      control={signupForm.control}
                      name="phone"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <PhoneInput
                          id="signup-phone"
                          defaultCountry="US"
                          international={false}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {signupForm.formState.errors.phone ? (
                      <div className="text-danger small mt-1">
                        {signupForm.formState.errors.phone.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <label className="form-label" htmlFor="signup-password">
                        Password
                      </label>
                      <p className="text-gray-6 fw-medium mb-1">
                        Must be 8 Characters at Least
                      </p>
                    </div>
                    <input
                      id="signup-password"
                      type="password"
                      className="form-control"
                      {...signupForm.register("password", {
                        minLength: {
                          message: "Password must be at least 8 characters",
                          value: 8,
                        },
                        required: "Password is required",
                      })}
                    />
                    {signupForm.formState.errors.password ? (
                      <div className="text-danger small mt-1">
                        {signupForm.formState.errors.password.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agree_terms"
                          {...signupForm.register("agree", {
                            required: "You must agree to continue",
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agree_terms"
                        >
                          I agree to{" "}
                          <Link
                            href="/about"
                            className="text-primary text-decoration-underline"
                          >
                            Terms of use
                          </Link>{" "}
                          &{" "}
                          <Link
                            href="/contact"
                            className="text-primary text-decoration-underline"
                          >
                            Privacy policy
                          </Link>
                        </label>
                      </div>
                    </div>
                    {signupForm.formState.errors.agree ? (
                      <div className="text-danger small mt-1">
                        {signupForm.formState.errors.agree.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-lg btn-linear-primary w-100"
                      disabled={
                        signupForm.formState.isSubmitting || isAuthenticating
                      }
                    >
                      {signupForm.formState.isSubmitting || isAuthenticating
                        ? "Signing Up..."
                        : "Sign Up"}
                    </button>
                  </div>

                  <div className="login-or mb-3">
                    <span className="span-or">Or sign up with </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <button
                      type="button"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-3"
                    >
                      <img
                        src="/assets/img/icons/google-icon.svg"
                        className="me-2"
                        alt="Google"
                      />
                      Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                    >
                      <img
                        src="/assets/img/icons/fb-icon.svg"
                        className="me-2"
                        alt="Facebook"
                      />
                      Facebook
                    </button>
                  </div>

                  <div className="d-flex justify-content-center">
                    <p className="mb-0">
                      Already have a account?{" "}
                      <button
                        type="button"
                        className="text-primary sow-auth-switch"
                        onClick={() => setModal("login")}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
