function Progress({ index, numQuestion, points, maxPossibleValue, answer }) {
  return (
    <header className="progress">
      <progress
        style={{
          color: "#FF0000 !important",
          accentColor: "#FF0000 !important",
          WebkitAccentColor: "#FF0000 !important",
          AccentColor: "#FF0000 !important",
        }}
        max={numQuestion}
        value={index + Number(answer !== null)}
      >
        {" "}
      </progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      {/* <p>
        <strong>Correct: {points}</strong> / {maxPossibleValue}
      </p> */}
    </header>
  );
}

export default Progress;
