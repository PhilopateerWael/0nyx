import { useState } from 'react'

const Socials = () => {
    const [copied, setCopied] = useState(false);

    return (
        <div className="mt-8 pt-4 border-t border-[#222] flex justify-evenly flex-wrap gap-4">
            <a
                href="https://www.linkedin.com/in/philo-wael/"
                target="_blank"
                className="hover:text-[#bbb] transition"
            >
                LinkedIn
            </a>

            <button
                className="hover:text-[#bbb] transition cursor-pointer"
                onClick={async () => {
                    await navigator.clipboard.writeText("reconstructed.philo@gmail.com");
                    setCopied(true);

                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                }}
            >
                {copied ? "Copied!" : "Email"}
            </button>

            <a
                href="https://github.com/PhilopateerWael"
                target="_blank"
                className="hover:text-[#bbb] transition"
            >
                GitHub
            </a>

            <a
                href="https://codeforces.com/profile/Mesmer_the_impaler"
                target="_blank"
                className="hover:text-[#bbb] transition"
            >
                Codeforces
            </a>
        </div>
    )
}

export default Socials