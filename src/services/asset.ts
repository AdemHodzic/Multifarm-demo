import axios from "axios";


// Types 
export type HistoryValue = {
    value: number;
    date: string;
}

export type Asset = {
    assetId: string;
    tvlStakedHistory: HistoryValue[];
    aprHistory: HistoryValue[];
}

// Functions

const generateAPRHistoryArray = (arrLength: number, startingDate: string) => {
    const arr: HistoryValue[] = [];
    let value = 1;
    let date = startingDate;
    for (let i = 0; i < arrLength; i++) {
        arr.push({
            value,
            date
        });
        value *= 1.05;
        date = new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString().split('T')[0];
    }
    return arr;
}

const normalizeAsset = (rawAsset: any): Asset => {
    const { assetId } = rawAsset;
    const tvlStakedHistory = rawAsset['selected_farm'][0]['tvlStakedHistory'] as HistoryValue[];
    const aprHistory = generateAPRHistoryArray(tvlStakedHistory.length, tvlStakedHistory[0]["date"])
    
    return {
        assetId,
        tvlStakedHistory,
        aprHistory,
    }
}

// Exported functions

export const getAssets = async (): Promise<Asset[]> => {
    const { data } = await axios.get(
        "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"
    ).then(res => res.data);

    const result = data.map((rawAsset: any) => normalizeAsset(rawAsset))

    return result;
}

export const blankAsset = (): Asset => {
    return {
        assetId: "",
        tvlStakedHistory: [],
        aprHistory: [],
    }
}