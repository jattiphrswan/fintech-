import {
  ArrowRight,
  Sparkles,
  WalletCards,
  CircleDollarSign
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  motion
} from "motion/react";

import PageMeta from "../components/seo/PageMeta";

import "./comingSoon.css";

export default function ComingSoon({
  title = "This page",
  description = "Something new is on the way."
}) {
  return (
    <>
      <PageMeta
        title={`${title} | Payline`}
        description={description}
      />

      <section className="coming">

        <motion.div
          className="coming__panel"
          initial={{
            opacity: 0,
            scale: .97
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: .6
          }}
        >

          <div className="coming__brand">
            <span>
              P
            </span>

            Payline
          </div>


          <motion.div
            className="coming__icon"
            animate={{
              y: [0, -7, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={26} />
          </motion.div>


          <span className="coming__eyebrow">
            WE'RE BUILDING
          </span>


          <h1>
            {title}
            <span>
              {" "}is coming soon.
            </span>
          </h1>


          <p>
            {description}
          </p>


          <Link
            to="/"
            className="coming__button"
          >
            Back Home

            <ArrowRight size={18} />
          </Link>


          <motion.div
            className="
              coming__float
              coming__float--one
            "
            animate={{
              y: [0, -10, 0],
              rotate: [0, 6, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <WalletCards size={24} />
          </motion.div>


          <motion.div
            className="
              coming__float
              coming__float--two
            "
            animate={{
              y: [0, 9, 0],
              rotate: [0, -6, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CircleDollarSign size={24} />
          </motion.div>


          <span className="coming__watermark">
            Payline
          </span>

        </motion.div>

      </section>
    </>
  );
}
