import { useEffect, useState } from "react";
import { Logo } from "./components/Logo.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "./../../redux/store.ts";
import { useDispatch } from "react-redux";
import { validateJwt } from "../../redux/slices/userSlices/cases/verifyToken.ts";
import { registerUser } from "../../redux/slices/userSlices/cases/register.ts";
import Popup from "reactjs-popup";
import { Eula } from "../../globalComponents/modals/Eula.tsx";

export const RegisterRoute = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [emailError, setEmailError] = useState("");
    const [passError, setPasssError] = useState("");
    const [nameError, setNameError] = useState("");
    const [openEula, setOpenEula] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => {
            return {
                ...prev,
                [e.target.name]:
                    e.target.name != "name"
                        ? e.target.value.replace(/\s/g, "")
                        : e.target.value,
            };
        });
    };

    useEffect(() => {
        // must be redone to another protector.
        const tokenString = localStorage.getItem("JWTtoken");
        if (!tokenString)
            return console.error("token from local storage is null");
        dispatch(validateJwt(tokenString || "")).then(() => navigate("/trees"));
    }, []);

    const handleEmailSyntax = () => {
        const regex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!regex.test(loginData.email)) {
            setEmailError("invalid email format");
        } else {
            setEmailError("");
        }

        return regex.test(loginData.email);
    };
    const handlePassword = () => {
        const { password } = loginData;
        if (password.length === 0) {
            setPasssError("password too short");
            return false;
        }
        setPasssError("");
        return true;
    };

    const handleName = () => {
        const { name } = loginData;
        if (name.length === 0) {
            setNameError("name too short");
            return false;
        }
        setNameError("");
        return true;
    };

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (handlePassword() && handleEmailSyntax()) {
            console.log(loginData);
            return dispatch(registerUser(loginData)).then(() =>
                navigate("/login")
            );
        }
        toast.error("invalid register data");
    };

    return (
        <main className="flex h-[100vh] bg-mainBg justify-center">
            <section className="2xl:w-1/2 w-3/4 flex justify-center items-center text-default-color">
                <article className="flex flex-col w-1/2">
                    <Logo />
                    <form action="#" className="w-full">
                        <p className="mt-10 mb-5 text-lg title text-center">
                            Register new account
                        </p>
                        <p className="w-full mb-1 pl-4 text-error text-sm">
                            {emailError}
                        </p>
                        <input
                            className="w-full mb-4"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={loginData.email}
                            onChange={(e) => handleForm(e)}
                            onBlur={() => handleEmailSyntax()}
                        />
                        <p className="w-full mb-1 pl-4 text-error text-sm">
                            {passError}
                        </p>
                        <input
                            className="w-full mb-4"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) => handleForm(e)}
                            onBlur={() => handlePassword()}
                        />
                        <p className="w-full mb-1 pl-4 text-error text-sm">
                            {nameError}
                        </p>
                        <input
                            className="w-full"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={loginData.name}
                            onChange={(e) => handleForm(e)}
                            onBlur={() => handleName()}
                        />
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="w-full gradient-button"
                        >
                            Register
                        </button>
                        <p className="pt-4 text-center">
                            By clicking Register, you agree to our{" "}
                            <a
                                className="text-cyan-400 cursor-pointer"
                                onClick={() => setOpenEula((prev) => !prev)}
                            >
                                Terms
                            </a>
                            .
                        </p>
                    </form>
                    {/* <div className="w-full flex justify-between mt-[3rem] items-center">
                        <p>Forgot that you</p>
                        <button onClick={() => navigate("/register")} className="register-button">
                            Register
                        </button>
                    </div> */}
                    <Popup open={openEula} modal nested>
                        {
                            // It looks like there is a line to allow it but it is commented out
                            // I'm assuming it was difficult to type properly and the library author gave up.
                            // @ts-ignore
                            (close) => (
                                <>
                                    <Eula close={() => setOpenEula(false)} />
                                </>
                            )
                        }
                    </Popup>
                </article>
            </section>
        </main>
    );
};
