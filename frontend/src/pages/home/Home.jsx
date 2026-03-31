import HomeChild from "../../components/HomeChild.jsx";
import Button from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const feat1Ref = useRef(null);
    const feat2Ref = useRef(null);
    const feat3Ref = useRef(null);

    useEffect(() => {
        // Hero Animation
        gsap.fromTo(".hero-text-line",
            { y: "150%", opacity: 0, rotateZ: 2 },
            { y: "0%", opacity: 1, rotateZ: 0, duration: 1.4, stagger: 0.15, ease: "power4.out", delay: 0.2 }
        );
        gsap.fromTo(".hero-fade",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.8 }
        );

        // Features Scroll Animation
        const featureCards = featuresRef.current.children;
        gsap.fromTo(featureCards,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 80%",
                }
            }
        );

        // Feature 1 Inner Animation
        gsap.fromTo(".feat1-item",
            { width: "0%", opacity: 0 },
            {
                width: (i, target) => target.dataset.width,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: feat1Ref.current,
                    start: "top 70%"
                }
            }
        );

        // Feature 2 Inner Animation
        const feat2Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: feat2Ref.current,
                start: "top 70%"
            }
        });
        feat2Timeline.fromTo(".feat2-box1", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
            .fromTo(".feat2-dash", { width: 0, opacity: 0 }, { width: 48, opacity: 1, duration: 0.5, ease: "power2.inOut" })
            .fromTo(".feat2-box2", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");

        // Feature 3 Inner Animation
        gsap.fromTo(".feat3-lock",
            { y: 20, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: feat3Ref.current,
                    start: "top 70%"
                }
            }
        );
        gsap.fromTo(".feat3-dot",
            { scale: 0 },
            {
                scale: 1, duration: 0.5, delay: 0.5, ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: feat3Ref.current,
                    start: "top 70%"
                }
            }
        );

    }, []);

    return (
        <HomeChild className="pt-32 lg:pt-48 pb-24 w-full">
            {/* Hero Section */}
            <section ref={heroRef} className="flex flex-col gap-8 items-start relative z-10 text-left mb-40 w-full">
                <div className="hero-fade flex items-center gap-4 text-gray-500 dark:text-gray-400 font-mono text-sm tracking-widest uppercase mb-4">
                    <span className="w-8 h-[1px] bg-gray-300 dark:bg-gray-600"></span> Capabilities
                </div>

                <h1 className="text-[4rem] sm:text-7xl lg:text-[7rem] font-medium leading-[1] tracking-tighter text-black dark:text-white flex flex-col">
                    <div className="overflow-hidden py-2"><div className="hero-text-line">Intelligent detection.</div></div>
                    <div className="overflow-hidden py-2"><div className="hero-text-line text-gray-400 dark:text-gray-600">Life-saving precision.</div></div>
                </h1>

                <p className="hero-fade text-xl lg:text-3xl text-gray-500 dark:text-gray-400 max-w-4xl leading-tight mt-6">
                    Harness the power of neural networks to analyze images of moles and lesions. Securely detect, analyze, and scale the best experiences.
                </p>
                <div className="hero-fade flex gap-4 mt-12 mb-32">
                    <Button text="Start your analysis" onClick={() => navigate("/take-a-test")} className="px-10 py-4 text-lg" />
                    <Button text="Learn more" filled={false} className="px-10 py-4 text-lg border border-gray-200 dark:border-white/10" />
                </div>
            </section>

            {/* Marquee Section */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 z-10 overflow-hidden py-4 border-y border-black/10 dark:border-white/10 mb-32 bg-gray-50 dark:bg-white/5 flex">
                <div className="flex shrink-0 animate-infinite-scroll whitespace-nowrap min-w-full justify-around items-center">
                    <span className="text-xl font-medium tracking-widest mx-8 text-black dark:text-white uppercase font-sans">
                        Detect Early &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Prevent Risk &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; AI Powered Diagnosis &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Skin Cancer Awareness &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Save Lives &nbsp;&nbsp;&nbsp; •
                    </span>
                    <span className="text-xl font-medium tracking-widest mx-8 text-black dark:text-white uppercase font-sans">
                        Detect Early &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Prevent Risk &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; AI Powered Diagnosis &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Skin Cancer Awareness &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Save Lives &nbsp;&nbsp;&nbsp; •
                    </span>
                </div>
                <div className="flex shrink-0 animate-infinite-scroll whitespace-nowrap min-w-full justify-around items-center" aria-hidden="true">
                    <span className="text-xl font-medium tracking-widest mx-8 text-black dark:text-white uppercase font-sans">
                        Detect Early &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Prevent Risk &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; AI Powered Diagnosis &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Skin Cancer Awareness &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Save Lives &nbsp;&nbsp;&nbsp; •
                    </span>
                    <span className="text-xl font-medium tracking-widest mx-8 text-black dark:text-white uppercase font-sans">
                        Detect Early &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Prevent Risk &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; AI Powered Diagnosis &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Skin Cancer Awareness &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Save Lives &nbsp;&nbsp;&nbsp; •
                    </span>
                </div>
            </div>

            {/* Features Section */}
            <section ref={featuresRef} className="flex flex-col relative z-10 w-full">

                {/* Feature 1 */}
                <div ref={feat1Ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-20 border-t border-black/10 dark:border-white/10">
                    <div className="md:col-span-2 font-mono text-sm text-gray-400 pt-2">01</div>
                    <div className="md:col-span-10 flex flex-col md:flex-row justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-medium tracking-tight text-black dark:text-white mb-6">High Accuracy</h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                Push to results in seconds. Our neural network ensures your scans are analyzed instantly, anywhere in the world, identifying suspicious patterns with precision.
                            </p>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-xl h-64 flex items-center justify-center border border-black/5 dark:border-white/5">
                            <div className="w-1/2 h-1/2 flex flex-col gap-2 relative">
                                <div className="feat1-item h-4 bg-gray-300 dark:bg-gray-600 rounded-sm" data-width="25%"></div>
                                <div className="feat1-item h-4 bg-gray-300 dark:bg-gray-600 rounded-sm" data-width="50%"></div>
                                <div className="feat1-item h-4 bg-gray-300 dark:bg-gray-600 rounded-sm" data-width="75%"></div>
                                <div className="feat1-item h-4 bg-gray-400 dark:bg-gray-400 rounded-sm" data-width="100%"></div>
                                <div className="feat1-item h-4 bg-black dark:bg-white rounded-sm mt-auto" data-width="100%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div ref={feat2Ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-20 border-t border-black/10 dark:border-white/10">
                    <div className="md:col-span-2 font-mono text-sm text-gray-400 pt-2">02</div>
                    <div className="md:col-span-10 flex flex-col md:flex-row justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-medium tracking-tight text-black dark:text-white mb-6">Instant Results</h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                Work seamlessly. Upload a clear image and get your initial analysis mapped out automatically. No configuration needed.
                            </p>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-xl h-64 flex items-center justify-center border border-black/5 dark:border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:20px_20px] opacity-[0.03] dark:opacity-5"></div>
                            <div className="flex gap-8 items-center relative z-10">
                                <div className="feat2-box1 w-16 h-20 border-2 border-black dark:border-white rounded-md bg-white dark:bg-black"></div>
                                <div className="feat2-dash h-[2px] w-0 border-t-2 border-dashed border-black dark:border-white"></div>
                                <div className="feat2-box2 w-16 h-20 border-2 border-black dark:border-white rounded-md bg-white dark:bg-black"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 3 */}
                <div ref={feat3Ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-20 border-t border-black/10 dark:border-white/10">
                    <div className="md:col-span-2 font-mono text-sm text-gray-400 pt-2">03</div>
                    <div className="md:col-span-10 flex flex-col md:flex-row justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-medium tracking-tight text-black dark:text-white mb-6">Enterprise Security</h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                Trust is non-negotiable. Full privacy encryption built into every layer. Your medical data stays yours.
                            </p>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-xl h-64 flex items-center justify-center border border-black/5 dark:border-white/5">
                            <div className="feat3-lock w-24 h-28 border-2 border-black dark:border-white rounded-xl rounded-t-[3rem] p-4 flex flex-col items-center justify-center bg-white dark:bg-black shadow-sm">
                                <div className="w-8 h-10 border-2 border-black dark:border-white rounded-md bg-black dark:bg-white relative top-2">
                                    <div className="feat3-dot w-2 h-3 bg-white dark:bg-black mx-auto mt-2 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </HomeChild>
    )
}

export default Home;