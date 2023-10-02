function countWeekdaysBetweenDates(fromDate, toDate) {
  const weekdaysCount = [0, 0, 0, 0, 0];

  let currentDate = new Date(fromDate);
  const end = new Date(toDate);

  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdaysCount[dayOfWeek - 1]++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdaysCount;
}

function calculateAttendance() {
  const subjectName = document.getElementById('subjectName').value;
  const classesAttended = parseInt(document.getElementById('classesAttended').value) || 0;
  const totalClasses = parseInt(document.getElementById('totalClasses').value) || 0;
  const monday = parseInt(document.getElementById('monday').value) || 0;
  const tuesday = parseInt(document.getElementById('tuesday').value) || 0;
  const wednesday = parseInt(document.getElementById('wednesday').value) || 0;
  const thursday = parseInt(document.getElementById('thursday').value) || 0;
  const friday = parseInt(document.getElementById('friday').value) || 0;

  const currentAtt = (classesAttended / totalClasses) * 100;

  const fromDate = new Date(document.getElementById('fromDate').value);
  const toDate = new Date(document.getElementById('toDate').value);

  const weekdaysCountList = countWeekdaysBetweenDates(fromDate, toDate);

  const totalMonday = monday * weekdaysCountList[0];
  const totalTuesday = tuesday * weekdaysCountList[1];
  const totalWednesday = wednesday * weekdaysCountList[2];
  const totalThursday = thursday * weekdaysCountList[3];
  const totalFriday = friday * weekdaysCountList[4];

  const totalDays = totalMonday + totalTuesday + totalWednesday + totalThursday + totalFriday + totalClasses;
  const overallAttendance = (classesAttended / totalDays) * 100;

  let add = '';
  if (overallAttendance < 75) {
    const to_75 = ((75 * totalDays) - (100 * classesAttended)) / (100 - 75);
    const to_85 = ((85 * totalDays) - (100 * classesAttended)) / (100 - 85);
    const to_90 = ((90 * totalDays) - (100 * classesAttended)) / (100 - 90);
    const to_80 = ((80 * totalDays) - (100 * classesAttended)) / (100 - 80);
    add = `
    <h2>To Improve Upto:-</h2>
    <p>75% : ${Math.round(to_75)} more Classes</p>
    <p>80% : ${Math.round(to_80)} more Classes</p>
    <p>85% : ${Math.round(to_85)} more Classes</p>
    <p>90% : ${Math.round(to_90)} more Classes</p>
    `;
  }
  else if (overallAttendance < 80) {
    const to_85 = ((85 * totalDays) - (100 * classesAttended)) / (100 - 85);
    const to_90 = ((90 * totalDays) - (100 * classesAttended)) / (100 - 90);
    const to_80 = ((80 * totalDays) - (100 * classesAttended)) / (100 - 80);
    add = `
  <h2>To Improve Upto:-</h2>
  <p>80% : ${Math.round(to_80)} More classes</p>
  <p>85% : ${Math.round(to_85)} More classes</p>
  <p>90% : ${Math.round(to_90)} More classes</p>
  `;
  }
  else if (overallAttendance < 85) {
    const to_85 = ((85 * totalDays) - (100 * classesAttended)) / (100 - 85);
    const to_90 = ((90 * totalDays) - (100 * classesAttended)) / (100 - 90);
    add = `
    <h2>To Improve Upto:-</h2>
    <p>85% : ${Math.round(to_85)} More Classes</p>
    <p>90% : ${Math.round(to_90)} More Classes</p>
    `;
  }
  else if (overallAttendance < 90) {
    const to_90 = ((90 * totalDays) - (100 * classesAttended)) / (100 - 90);
    add = `
  <h2>To Improve Upto:-</h2>
  <p>90% : ${Math.round(to_90)} More Classes</p>
  `;
  }

  const output = `
    <h2>${subjectName}</h2>
    <p>Current Attendance is : ${currentAtt.toFixed(2)}%</p>
    <p>New Attendance will be: ${overallAttendance.toFixed(2)}%</p>
    `;

  document.getElementById('totalAttendance').innerHTML = output + add;
}





