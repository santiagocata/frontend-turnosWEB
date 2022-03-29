const genTurns = (startHour, endHour) => {
  const allTurns = [];
  for (let i = startHour; i < endHour; i++) {
    let turnMinute = 0;
    for (let j = 0; j < 4; j++) {
      allTurns.push(
        new Date(i * 60 * 60000 + turnMinute * 60000)
          .toISOString()
          .slice(11, 16)
      );
      turnMinute = turnMinute + 15;
    }
  }
  return allTurns;
};

export default genTurns;
