const getDds = count => {
  const alphabet_original = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabet = alphabet_original.slice(0, count);
  const dds = {};

  for (let j = 0; j < alphabet.length; j++) {
    for (let i = 1; i < count + 1; i++) {
      if (alphabet[j] === "A" && i === 1) {
        dds.A1 = { key: "A1", value: "200", expr: "" };
        continue;
      }
      if (alphabet[j] === "A" && i === 2) {
        dds.A2 = { key: "A2", value: "300", expr: "" };
        continue;
      }
      if (i % 3 === 0) {
        dds[`${alphabet[j] + i}`] = {
          key: `${alphabet[j] + i}`,
          value: "500",
          expr: "=A1+A2"
        };
      } else {
        dds[`${alphabet[j] + i}`] = {
          key: `${alphabet[j] + i}`,
          value: "500",
          expr: ""
        };
      }
    }
  }

  return dds;
};

export default getDds;
