type Props = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    submit: () => void;
};

export default function TodoInput({
    content,
    setContent,
    submit
}: Props) {
    return (
        <div className="card">
        <input className='' type="text" placeholder="할 일을 적어주세요" value={content} onChange={e => {
          setContent(e.target.value);
        }} 
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
          outline: "none"
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }} />
        <button onClick={() => {
          submit();
        }} style={{
          padding: "12px",
          borderRadius: "14px",
          border: "none",
          backgroundColor: "#f9a8d4",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(294,168,212,0.4)",
          transition: "0.2s",
        }}>
          add
        </button>
      </div>
    );
}