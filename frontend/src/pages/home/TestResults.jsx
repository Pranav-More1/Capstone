
import backBtnImg from "../../assets/back.svg";
import HomeChild from "../../components/HomeChild.jsx";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EmptyState from "./EmptyState.jsx";
import {moreInfos, precautions} from "../../more_infos.js";
import unauthorizedImg from "../../assets/unauthorized.svg";
import PrecautionItem from "../../components/PrecautionItem.jsx";
import Button from "../../components/Button.jsx";
import {useState} from "react";
import axios from "axios";
import {API_BASE_URL, SHARE_RESULTS_ROUTE} from "../../constants.js";

function TestResults() {
    const data = useLoaderData();
    const navigate = useNavigate();
    const [shareBtnDisabled, setShareBtnDisabled] = useState(false);

    const backBtnClick = () => navigate(-1);

    const handleShareResultsClick = async () => {
        setShareBtnDisabled(true);
        try {
            const response = await axios.get(API_BASE_URL + SHARE_RESULTS_ROUTE, {
                withCredentials: true
            });

            if (response.status === 200) {
                const path = response.data.path;
                await navigator.clipboard.writeText(location.href + path);
                alert("Link copied on clipboard");
            }

        } catch{}
        setShareBtnDisabled(false);
    }

    if (!data) {
        return <EmptyState imgSrc={unauthorizedImg} heading="Unauthorized!" body="You cannot access this page. Please login to access this page."/>
    }

    if (!data.prediction) {
        return <EmptyState imgSrc={unauthorizedImg} heading="No Previous Test Found!" body="You have to take a test before seeing the results."/>
    }

    // Sort all predictions by percentage descending, excluding specific classes
    const EXCLUDED_CLASSES = ["Basal cell carcinoma", "Melanocytic nevi"];
    const sortedPredictions = data.allPredictions
        ? Object.entries(data.allPredictions)
            .filter(([className]) => !EXCLUDED_CLASSES.includes(className))
            .sort((a, b) => b[1] - a[1])
        : [];

    return (
        <HomeChild className="pt-32 lg:pt-40 pb-24 min-h-screen grid grid-cols-2 gap-y-6 auto-rows-max gap-x-6 w-full">
            <div className="flex gap-3 items-center cursor-pointer col-span-full" onClick={backBtnClick}>
                <img src={backBtnImg}/>
                <span className="dark:text-white">Back</span>
            </div>
            <h1 className="text-3xl font-bold dark:text-white">Test Results Summary</h1>
            <Button text="Share Results" filled={false} className="place-self-end" onClick={handleShareResultsClick} disabled={shareBtnDisabled}/>

            <img src={`data:${data.imageType};base64,${data.image}`}
                 className="h-80 max-h-80 mt-6 w-80 object-cover rounded col-span-full place-self-center"/>

            <div className="flex flex-col items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-xl">
                    <span>Prediction</span>
                </span>
                <h2 className="text-2xl lg:text-3xl text-center font-semibold capitalize dark:text-white">{data.prediction}</h2>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-3 text-xl">
                    <span>Confidence</span>
                </span>
                <h2 className="text-2xl lg:text-3xl font-semibold dark:text-white">{`${Math.round(parseFloat(data.predictionConfidence) * 100)}%`}</h2>
            </div>

            {/* All Predictions Table */}
            {sortedPredictions.length > 0 && (
                <div className="col-span-full mt-6">
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">All Class Predictions</h3>
                    <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                        <table className="w-full text-left text-sm md:text-base">
                            <thead>
                                <tr className="bg-black dark:bg-white text-white dark:text-black">
                                    <th className="px-6 py-3 font-semibold">#</th>
                                    <th className="px-6 py-3 font-semibold">Condition</th>
                                    <th className="px-6 py-3 font-semibold">Probability</th>
                                    <th className="px-6 py-3 font-semibold">Likelihood Bar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPredictions.map(([className, pct], idx) => {
                                    const isTop = className === data.prediction;
                                    return (
                                        <tr
                                            key={className}
                                            className={`border-t border-black/5 dark:border-white/5 transition-colors
                                                ${isTop
                                                    ? "bg-black/5 dark:bg-white/10"
                                                    : "hover:bg-black/[0.02] dark:hover:bg-white/5"
                                                }`}
                                        >
                                            <td className="px-6 py-4 font-mono text-gray-400 dark:text-gray-500">{String(idx + 1).padStart(2, '0')}</td>
                                            <td className="px-6 py-4 font-medium dark:text-white flex items-center gap-2">
                                                {isTop && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded">
                                                        Top
                                                    </span>
                                                )}
                                                {className}
                                            </td>
                                            <td className="px-6 py-4 font-semibold tabular-nums dark:text-white">
                                                {pct.toFixed(2)}%
                                            </td>
                                            <td className="px-6 py-4 w-48">
                                                <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-700 ${isTop ? "bg-black dark:bg-white" : "bg-gray-400 dark:bg-gray-500"}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <h3 className="col-span-full text-2xl lg:text-3x mt-6 font-bold capitalize dark:text-white">More
                About {data.prediction}</h3>

            <p className="first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left col-span-full text-xl dark:text-gray-300">
                {moreInfos[data.prediction]}
            </p>

            <h3 className="col-span-full text-2xl lg:text-3x mt-4 font-bold capitalize dark:text-white">
                Precautions
            </h3>

            <div className="col-span-full grid grid-cols-3 gap-x-6 gap-y-10">
                {
                    precautions.map(precaution => <PrecautionItem {...precaution}/>)
                }
            </div>
        </HomeChild>
    )
}

export default TestResults;