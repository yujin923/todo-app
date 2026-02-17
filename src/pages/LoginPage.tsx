import { useState } from "react";


type Props = {
    onLogin: () => void;
    goSignup: () => void;
};

export default function LoginPage({ onLogin, goSignup }: Props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await fetch ("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password}),
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            onLogin();
        } else {
            alert("로그인 실패");
        }
    };

    return (
        <main style={{
            width: '100vw',
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg,#e0f2fe,#fce7f3)"
        }}>
            <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                width: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                <h2>Login</h2>

                <input
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={login}>로그인</button>

                <button onClick={goSignup}>
                    회원가입 하러가기
                </button>
            </div>
        </main>
    )
}