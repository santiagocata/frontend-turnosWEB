const genTurns = (startHour, endHour, quant, actualStatus) => {
  const allTurns = [];
  for (let i = startHour; i < endHour; i++) {
    let turnMinute = 0;
    for (let j = 0; j < 4; j++) {
      allTurns.push({
        time: new Date(i * 60 * 60000 + turnMinute * 60000)
          .toISOString()
          .slice(11, 16),
        available: quant,
      });
      turnMinute = turnMinute + 15;
    }
  }

  allTurns.map((turn) => {
    if (!!actualStatus[turn.time]) turn.available -= actualStatus[turn.time];
  });

  return allTurns.filter((turn) => !(turn.available <= 0));
};

export default genTurns;
