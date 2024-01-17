let customHolidays = new Set();

function planVacation() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const maxOffDays = parseInt(document.getElementById('maxOffDays').value);

    const binaryArray = generateBinaryArray(startDate, endDate);
    const result = calculateMaxConsecutiveOnes(binaryArray, maxOffDays);

    const vacationDetails = document.getElementById('vacationDetails');
    if (result.startIndex !== -1 && result.endIndex !== -1) {
        const startVacationDate = startDate.addDays(result.startIndex);
        const endVacationDate = startDate.addDays(result.endIndex);
        const size = result.endIndex - result.startIndex + 1;
        vacationDetails.innerHTML = `You can have a vacation from ${startVacationDate} to ${endVacationDate}, which is ${size} days long.`;
    } else {
        vacationDetails.innerHTML = `Sorry, couldn't find a valid vacation within the constraints.`;
    }
}

function addCustomHoliday() {
    const newHolidayDate = new Date(document.getElementById('newHolidayDate').value);
    customHolidays.add(newHolidayDate.toISOString().split('T')[0]);
    document.getElementById('newHolidayDate').value = '';
    alert('Custom holiday added!');
}

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

function calculateMaxConsecutiveOnes(binaryArray, k) {
    let left = 0;
    let right = 0;
    let maxOnes = 0;
    let zeroCount = 0;
    let result = { startIndex: -1, endIndex: -1 };

    while (right < binaryArray.length) {
        if (binaryArray[right] === 0) {
            zeroCount++;
        }

        while (zeroCount > k) {
            if (binaryArray[left] === 0) {
                zeroCount--;
            }
            left++;
        }

        if (right - left + 1 > maxOnes) {
            maxOnes = right - left + 1;
            result.startIndex = left;
            result.endIndex = right;
        }

        right++;
    }

    return result;
}

function generateBinaryArray(startDate, endDate) {
    const binaryArray = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = isWeekend || customHolidays.has(currentDate.toISOString().split('T')[0]);

        binaryArray.push(isHoliday ? 1 : 0);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return binaryArray;
}
