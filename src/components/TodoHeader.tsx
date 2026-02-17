type Props = {
    remaining: number;
};

export default function TodoHeader({ remaining }: Props) {
    return (
        <>
           <h1
        style={{
          fontSize: "26px",
          fontWeight: "700",
          letterSpacing: "-0.5px"
        }}>
        Todo List 
      </h1>
      <p 
        style={{
          alignSelf: "start",
          backgroundColor: "#fce7f3",
          color: "#d6709bff",
          padding: "6px 14px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: "600"
        }}>
          남은 할 일: {remaining}개
          </p>
        </>
    );
}