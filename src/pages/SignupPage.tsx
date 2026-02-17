import { useState } from "react";

type Props = {
    goLogin: () => void;
};

export default function SignupPage({ goLogin }: Props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.success) {
            alert("회원가입 성공! 로그인 해주세요");
            goLogin();
        } else {
            alert("회원가입 실패");
        }
    };

    return (
        <main style={{
            width:"100vw",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            background: "linear-gradient(135deg,#e0f2fe,#fce7f3)"
        }}>
            <div style={{
                background:"white",
                padding:"40px",
                borderRadius: "20px",
                width: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                <h2>Signup</h2>

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

                <button onClick={signup}>회원가입</button>

                <button onClick={goLogin}>
                    로그인으로 돌아가기
                </button>
            </div>
        </main>
    );
};