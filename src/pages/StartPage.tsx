type Props = {
    goLogin: () => void;
    goSignup: () => void;
};

export default function StartPage({ goLogin, goSignup }: Props) {
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
                borderRadius: "50px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                <h2>Welcome</h2>

                <button onClick={goLogin}>로그인</button>
                <button onClick={goSignup}>회원가입</button>
            </div>
        </main>
    );
}