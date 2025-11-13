"use client";

import { useRouter } from "next/navigation";
import { IconVideo } from "@tabler/icons-react";
import { SupervisingPhysicianCard } from "@/features/overview/components/supervisor_info";

export default function CenterOperatorOverviewPage() {
    const router = useRouter();

    const handleJoin = () => {
        router.push("/center-operator/meeting");
        // window.location.href = "http://localhost:5173/?meetingNumber=84634097083&passWord=&userName=Dr+Smith&uuid=24a9c441-4930-3fc9-a66d-503632febb98&leaveUrl=http://localhost:3000";
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
            <div className="layout-container flex h-full grow flex-col">
                <main className="flex flex-1 flex-col items-center justify-center p-4">
                    {/* INNER CONTENT */}
                    <SupervisingPhysicianCard
                        online={true}
                        name="Dr. Emily Carter"
                        phone="+1 (555) 123-4567"
                        imageUrl="https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=400"
                    />
                    <br></br>
                    <div className="flex flex-col items-center gap-12 w-full max-w-md">
                        {/* JOIN BUTTON */}
                        <button
                            type="button"
                            onClick={handleJoin}
                            className="flex w-full min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-xl h-20 px-8 bg-blue-600 text-slate-50 text-xl font-bold tracking-[0.015em] shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
                        >
                            <IconVideo className="mr-4 h-10 w-10" />
                            <span className="truncate">Check-In for Supervision</span>
                        </button>

                        {/* PAST SESSIONS */}
                        <div className="text-center">
                            <a
                                href="#"
                                className="text-base text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary/80 transition-colors"
                            >
                                View Past Sessions
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}