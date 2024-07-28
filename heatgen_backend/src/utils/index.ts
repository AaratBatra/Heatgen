interface AggregateData {
    x: number;
    y: number;
    value: number;
}

export function aggregateData(data: AggregateData[]): AggregateData[] | undefined {
    if (!data) return;
    const aggregatedData: {
        [key: string]: { x: number; y: number; value: number; count: number };
    } = {};
    data.forEach(({ x, y, value }, index, arr) => {
        if (x == null || y == null || value == null) return;
        let xyIsCloseToPrevXYPlus = (index-1 < 0)? false :((x > data[index-1].x && x < data[index-1].x + 10) && (y > data[index-1].y && y < data[index-1].y + 10));
        let xyIsCloseToPrevXYMinus = (index-1 < 0)? false :((x < data[index-1].x && x > data[index-1].x - 10) && (y < data[index-1].y && y > data[index-1].y - 10));
        let key = `${x},${y}`;
        if (!aggregatedData[key]) {
            aggregatedData[key] = { x, y, value: 0, count: 0 };
        }
        if (xyIsCloseToPrevXYPlus || xyIsCloseToPrevXYMinus) {
            if (Object.keys(arr).length < 2) {
                aggregatedData[key].value += value;
                aggregatedData[key].count += 1;
            } else {
                const aggdatakeys = Object.keys(aggregatedData);
                key = aggdatakeys[aggdatakeys.length - 1];
            }
        }
        aggregatedData[key].value += value;
        aggregatedData[key].count += 1;
    });
    return Object.values(aggregatedData).map(({ x, y, value, count }) => ({
        x,
        y,
        value: value
    }));
}


// value: value/ count