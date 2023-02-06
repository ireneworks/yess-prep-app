// 특정 시간에 범위의 변경 등과 같이 요구사항 변경에 유연하게 대처하기 위해 선택 가능한 시간을 하드코딩한다.
const HOUR_DURATION = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const MINUTE_DURATION = [0, 15, 30, 45];

function generateTemporaryTargetDate(hh: string, mm: string) {
  // 임의의 날짜를 지정하여 date 객체 간의 시간을 계산한다.
  // 임의의 날짜는 다른 날짜로 변경하여 로직에는 영향을 미치지 않는다.
  return new Date(`2023-01-01T${hh}:${mm}`).getTime();
}

function formatHourDigit(target: number) {
  return `${target}`.padStart(2, "0");
}

export default function generateTimeTable() {
  const options = [];
  for (let h = 0; h < HOUR_DURATION.length; h++) {
    for (let m = 0; m < MINUTE_DURATION.length; m++) {
      const hh = formatHourDigit(HOUR_DURATION[h]);
      const mm = formatHourDigit(MINUTE_DURATION[m]);
      options.push({
        label: `${hh}:${mm}`,
        value: generateTemporaryTargetDate(hh, mm),
        enable: true,
      });
    }
  }

  return options;
}
