export const cumulativeSum = (numArray: number[]) => {
    const cumulative: number[] = []
    var sum: number = 0
    numArray.forEach(ele => {
        sum += ele
        cumulative.push(sum)
    })
    return cumulative
}