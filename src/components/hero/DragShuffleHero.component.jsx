import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const DragShuffleHero = () => {
  const dragProgress = useMotionValue(0);
  const [order, setOrder] = useState(["front", "middle", "back"]);
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = () => {
    const x = dragProgress.get();
    if (x <= -50) {
      const orderCopy = [...order];
      orderCopy.unshift(orderCopy.pop());
      setOrder(orderCopy);
    }
  };

  useEffect(() => {
    const FIVE_SECONDS = 5000;

    const intervalRef = setInterval(() => {
      const x = dragProgress.get();
      if (x === 0 && !dragging) {
        setOrder((prevOrder) => {
          const orderCopy = [...prevOrder];
          orderCopy.unshift(orderCopy.pop());
          return orderCopy;
        });
      }
    }, FIVE_SECONDS);

    return () => clearInterval(intervalRef);
  }, [dragging]);

  return (
    <section
      style={{ pointerEvents: dragging ? "none" : undefined }}
      className="overflow-hidden px-4 py-12 sm:px-8 sm:py-24 text-slate-500">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
        <div>
          <h1 className="text-5xl font-black leading-[1.25] md:text-7xl">
            You don't know about clothes until you see this
          </h1>
          <p className="mb-8 mt-4 text-lg text-slate-600">
            ...but we're going to help. We send out weekly break downs of
            exactly what's working and what's not for the largest companies in
            the world. It's free.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2">
            <Link to="shop">
              <Button />
            </Link>
          </form>
        </div>
        <motion.div
          whileTap={{ scale: 0.985 }}
          className="relative h-auto w-auto sm:h-[450px] sm:w-[350px]">
          <Card
            imgUrl="https://i.ibb.co/4W2DGKm/floral-blouse.png"
            testimonial="I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning."
            author="Jenn F. - Marketing Director @ Square"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[0]}
            dragging={dragging}
            setDragging={setDragging}
          />
          <Card
            imgUrl="https://i.ibb.co/XzcwL5s/black-shearling.png"
            testimonial="My boss thinks I know what I'm doing. Honestly, I just read this newsletter."
            author="Adrian Y. - Product Marketing @ Meta"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[1]}
            dragging={dragging}
            setDragging={setDragging}
          />
          <Card
            imgUrl="https://i.ibb.co/ZYW3VTp/brown-brim.png"
            testimonial="Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X."
            author="Devin R. - Growth Marketing Lead @ OpenAI"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[2]}
            dragging={dragging}
            setDragging={setDragging}
          />
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({
  handleDragEnd,
  dragProgress,
  testimonial,
  position,
  imgUrl,
  author,
  setDragging,
  dragging,
}) => {
  const dragX = useMotionValue(0);
  const draggableStyles = draggable ? "cursor-grab active:cursor-grabbing" : "";

  useMotionValueEvent(dragX, "change", (latest) => {
    // When component first mounts, dragX will be a percentage
    // due to us setting the initial X value in the animate prop.
    if (typeof latest === "number" && dragging) {
      dragProgress.set(latest);
    } else {
      // Default back to 0 so that setInterval can continue
      dragProgress.set(0);
    }
  });

  const onDragStart = () => setDragging(true);

  const onDragEnd = () => {
    setDragging(false);
    handleDragEnd();
  };

  const x = position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
  const rotateZ =
    position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
        x: dragX,
      }}
      animate={{ rotate: rotateZ, x }}
      drag={draggable ? "x" : false}
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`absolute left-0 top-0 grid h-auto w-full sm:h-[450px] sm:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-300/20 p-4 sm:p-6 shadow-xl backdrop-blur-md ${draggableStyles}`}>
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-900 bg-slate-400 object-cover"
      />
      <span className="text-center text-lg italic text-slate-950">
        "{testimonial}"
      </span>
      <span className="text-center text-sm font-medium text-indigo-700">
        {author}
      </span>
    </motion.div>
  );
};

const Button = () => {
  return (
    <div className="grid min-h-[200px] place-content-center  p-4">
      <EncryptButton />
    </div>
  );
};

const TARGET_TEXT = "SHOP ALL";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-900 px-4 py-2 font-mono font-medium uppercase bg-slate-300 text-black transition-colors hover:text-indigo-900">
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default DragShuffleHero;
