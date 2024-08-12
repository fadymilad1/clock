function getRotationDegrees(units, totalUnits) {
    return (units / totalUnits) * 360;
}

function updateHand(handId, degrees) {
    document.getElementById(handId).style.transform = `rotate(${degrees}deg)`;
}

function updateDigitalClock(hours, minutes, seconds) {
    const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
    ].join(':');

    document.getElementById('digital-clock').textContent = formattedTime;
}

function updateClock() {
    const select = document.getElementById('country-select');
    const timeZone = select.value;
    const now = new Date().toLocaleString("en-US", { timeZone });
    const date = new Date(now);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    // Calculate the total time since midnight
    const totalSecondsSinceMidnight = (hours * 3600) + (minutes * 60) + seconds + milliseconds / 1000;

    // Calculate the degrees for each hand
    const hourDegrees = getRotationDegrees(totalSecondsSinceMidnight / 3600, 12); // 3600 seconds per hour
    const minuteDegrees = getRotationDegrees(totalSecondsSinceMidnight / 60, 60); // 60 seconds per minute
    const secondDegrees = getRotationDegrees(totalSecondsSinceMidnight, 60);

    updateHand('hour-hand', hourDegrees);
    updateHand('minute-hand', minuteDegrees);
    updateHand('second-hand', secondDegrees);

    updateDigitalClock(hours, minutes, seconds);

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(updateClock);
}

document.getElementById('country-select').addEventListener('change', updateClock);

// Initial call to set the clock
updateClock();
