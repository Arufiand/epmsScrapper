function counterDivider(sum) {
    // If sum is less than 3, randomly distribute 1s across 3 counters
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    // If sum is less than 3, randomly distribute 1s across the counters
    if (sum < 3) {
        // Randomly distribute the 'sum' value across the counters
        while (sum > 0) {
            let randomIndex = Math.floor(Math.random() * 3); // Random index between 0 and 2
            // Increment the randomly selected counter
            if (randomIndex === 0) {
                count1 += 1;
            } else if (randomIndex === 1) {
                count2 += 1;
            } else {
                count3 += 1;
            }
            sum -= 1; // Decrease the remaining sum
        }

        console.log(`results are count1: ${count1}, count2: ${count2}, count3: ${count3}`); // Log the randomly distributed results
        return [count1, count2, count3]; // Return the counts
    }

    // For sum >= 3, divide equally and distribute the remainder
    count1 = Math.floor(sum / 3);
    count2 = Math.floor(sum / 3);
    count3 = Math.floor(sum / 3);

    let remainder = sum % 3;

    // Distribute the remainder across the counters
    if (remainder > 0) {
        count1 += 1;
        remainder -= 1;
    }
    if (remainder > 0) {
        count2 += 1;
        remainder -= 1;
    }
    if (remainder > 0) {
        count3 += 1;
    }
    console.log(`count1 is ${count1}`);
    console.log(`count2 is ${count2}`);
    console.log(`count3 is ${count3}`);

    return [count1, count2, count3];
}

module.exports = {
    counterDivider
}