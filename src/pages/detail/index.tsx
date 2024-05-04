import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CoinProps } from "../home";
import styles from "./detail.module.css"


interface ResponseData {
    data: CoinProps;
}

interface ErrrorData {
    error: string;
}

type DataProps = ResponseData | ErrrorData;


export function Detail() {

    const { cripto } = useParams();
    const [detail, setDetail] = useState<CoinProps>();
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        async function detailCripto() {
            try {
                let url = `https://api.coincap.io/v2/assets/${String(cripto)}`;
                fetch(url).then(response => response.json())
                    .then((data: DataProps) => {

                        if ("error" in data) {
                            navigate("/");
                            return;
                        }

                        const price = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD"
                        })
                        const priceCompact = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact"
                        })

                        const changeCompact = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact"
                        })

                        const resultData = {
                            ...data.data,
                            formatedPrice: price.format(Number(data.data.priceUsd)),
                            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
                            formatedChange: changeCompact.format(Number(data.data.changePercent24Hr))

                        }
                        setDetail(resultData);
                        setLoad(false)
                    })
            } catch (error) {
                console.log(error);


            }


        }

        detailCripto();
    }, [cripto]);


    if (load) {
        return (
            <div className={styles.cspiner}>
                <span className={styles.spiner}>
                </span>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${detail?.symbol.toLocaleLowerCase()}@2x.png`} alt="logo-moeda" />
            <h3>Moeda:{detail?.name}</h3>
            <p><strong>Preço:</strong>{detail?.formatedPrice}</p>
            <p><strong>Mercado:</strong>{detail?.formatedMarket}</p>
            <p><strong>Volume:</strong>{detail?.formatedVolume}</p>
            <p className={String(detail?.changePercent24Hr) < "0" ? styles.Loss : styles.winer}>
                <strong id="strong" >Mudança 24h:</strong>
                {detail?.formatedChange + "%"}
            </p>
        </div>

    )
}

