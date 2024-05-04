import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css"
import { BsSearch } from "react-icons/bs";
import { FormEvent, useState, useEffect } from "react";

export interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24r: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
    formatedChange?: string;

}


interface DataProps {
    data: CoinProps[];
}
export function Home() {


    const [input, setInput] = useState("");
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset] = useState(0);

    const navigate = useNavigate();

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

    useEffect(() => {

        getData();


    }, [offset])




    async function getData() { // função que vai  requisitar uma api e devolver o valor dela 

        let url = `https://api.coincap.io/v2/assets?limit=10&offset=${offset}`;
        fetch(url)
            .then(response => response.json())
            .then((data: DataProps) => {
                const coinsData = data.data;

                const formated = coinsData.map((item) => {
                    const formatedResult = {
                        ...item,
                        formatedPrice: price.format(Number(item.priceUsd)),
                        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
                        formatedChange: changeCompact.format(Number(item.changePercent24Hr))
                    }
                    return formatedResult;
                })
                const listCoins = [...coins, ...formated];
                setCoins(listCoins);

            }).catch(() => {
                navigate(`/notfound`)

            })

    }

    function setValeuInput(evento: FormEvent) {
        evento.preventDefault();

        if (input === "") return;
        navigate(`/detail/${input.toLowerCase()}`)

    }

    async function handleGetMore() {

        if (offset === 0) {
            setOffset(10);
            return;
        }
        setOffset(offset + 10);
    }

    return (
        <main className={styles.container}>
            <form onSubmit={setValeuInput} className={styles.form}>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Digite o nome da moeda " />;
                <button title="botão" type="submit">
                    <BsSearch size={30} color="#fff" />
                </button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th className={styles.moeda} scope="col">moeda</th>
                        <th scope="col">Valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id="tbody">

                    {coins.length > 0 && coins.map((itens) => (

                        <tr className={styles.tr} key={itens.id}>

                            <td className={styles.tdLabel} data-label="Moeda">

                                <Link to={`/detail/${itens.id}`} >
                                    <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${itens.symbol.toLocaleLowerCase()}@2x.png`} alt="logo-moeda" />
                                </Link>

                                <div className={styles.tdLabelContainer}>
                                    <Link to={`/detail/${itens.id}`}>
                                        <span className={styles.name}>{itens.name} | {itens.symbol}</span>
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdLabel} data-label="Valor mercado">
                                {itens.formatedVolume}
                            </td>

                            <td className={styles.tdLabel} data-label="Preço">
                                {itens.formatedPrice}
                            </td>

                            <td className={styles.tdLabel} data-label="Volume">
                                {itens.formatedVolume}
                            </td>
                            <td className={itens.changePercent24Hr > "0" ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                                <span>{itens.formatedChange}</span>
                            </td>

                        </tr>

                    ))}



                </tbody>
            </table>
            <button type="button" className={styles.buttonMore}
                onClick={handleGetMore}
            >carregar mais..</button>
        </main >
    )
}

