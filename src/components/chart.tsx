import { useEffect, useState } from "react";

import { Asset, blankAsset, getAssets } from '../services/asset';

import LineChart from "./lineChart";


const Chart = (props: any) => {
    const [isLoading, setIsloading] = useState(true);
    const [data, setData] = useState<Asset[]>([]);
    const [asset, setAsset] = useState<Asset>(blankAsset());

    useEffect(() => {
        (async () => {
            const assets = await getAssets();
            setData(assets);
            setAsset(assets[0]);
            setIsloading(false);
        })();
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            width: '100%'
        }}>

            <h1>{asset?.assetId}</h1>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                gap: '16px'
            }}>
                <LineChart rawData={asset.aprHistory} label="Asset APR (y)"></LineChart>
                <LineChart rawData={asset.tvlStakedHistory} label="Asset TVL" ></LineChart>
            </div>
        </div>
    )
}

export default Chart