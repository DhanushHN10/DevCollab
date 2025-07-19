// /*
// 	Installed from https://reactbits.dev/tailwind/
// */

// import { motion, useSpring, useTransform } from "framer-motion";
// import { useEffect } from "react";

// function Number({ mv, number, height }) {
//   let y = useTransform(mv, (latest) => {
//     let placeValue = latest % 10;
//     let offset = (10 + number - placeValue) % 10;
//     let memo = offset * height;
//     if (offset > 5) {
//       memo -= 10 * height;
//     }
//     return memo;
//   });

//   const style = {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   return <motion.span style={{ ...style, y }}>{number}</motion.span>;
// }

// function Digit({ place, value, height, digitStyle }) {
//   let valueRoundedToPlace = Math.floor(value / place);
//   let animatedValue = useSpring(valueRoundedToPlace);

//   useEffect(() => {
//     animatedValue.set(valueRoundedToPlace);
//   }, [animatedValue, valueRoundedToPlace]);

//   const defaultStyle = {
//     height,
//     position: "relative",
//     width: "1ch",
//     fontVariantNumeric: "tabular-nums",
//   };

//   return (
//     <div style={{ ...defaultStyle, ...digitStyle }}>
//       {Array.from({ length: 10 }, (_, i) => (
//         <Number key={i} mv={animatedValue} number={i} height={height} />
//       ))}
//     </div>
//   );
// }

// export default function Counter({
//   value= 1999,
//   fontSize = 40,
//   padding = 10,
//   places = [1000,100, 10, 1],
//   gap = 8,
//   borderRadius = 3,
//   horizontalPadding = 10,
//   textColor = "white",
//   fontWeight = "bold",
//   containerStyle,
//   counterStyle,
//   digitStyle,
//   gradientHeight = 16,
//   gradientFrom = "black",
//   gradientTo = "transparent",
//   topGradientStyle,
//   bottomGradientStyle,
// }) {
//   const height = fontSize + padding;

//   const defaultContainerStyle = {
//     position: "relative",
//     display: "inline-block",
//   };

//   const defaultCounterStyle = {
//     fontSize,
//     display: "flex",
//     gap: gap,
//     overflow: "hidden",
//     borderRadius: borderRadius,
//     paddingLeft: horizontalPadding,
//     paddingRight: horizontalPadding,
//     lineHeight: 1,
//     color: textColor,
//     fontWeight: fontWeight,
//   };

//   const gradientContainerStyle = {
//     pointerEvents: "none",
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   };

//   const defaultTopGradientStyle = {
//     height: gradientHeight,
//     background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
//   };

//   const defaultBottomGradientStyle = {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: gradientHeight,
//     background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
//   };

//   return (
//     <div style={{ ...defaultContainerStyle, ...containerStyle }}>
//       <div style={{ ...defaultCounterStyle, ...counterStyle }}>
//         {places.map((place) => (
//           <Digit
//             key={place}
//             place={place}
//             value={value}
//             height={height}
//             digitStyle={digitStyle}
//           />
//         ))}
//       </div>
//       <div style={gradientContainerStyle}>
//         <div
//           style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}
//         />
//         <div
//           style={
//             bottomGradientStyle
//               ? bottomGradientStyle
//               : defaultBottomGradientStyle
//           }
//         />
//       </div>
//     </div>
//   );
// }



import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function Number({ mv, number, height }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  const style = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <motion.span style={{ ...style, y }}>{number}</motion.span>;
}

function Digit({ place, value, height, digitStyle }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 80,
    damping: 15,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  const defaultStyle = {
    height,
    position: "relative",
    width: "1ch",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div style={{ ...defaultStyle, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value = 1999,
  fontSize = 30,
  padding = 10,
  places = [1000, 100, 10, 1],
  gap = 8,
  borderRadius = 3,
  horizontalPadding = 10,
  textColor = "white",
  fontWeight ="bold",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
}) {
  const height = fontSize + padding;

  const defaultContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const defaultCounterStyle = {
    fontSize,
    display: "flex",
    gap: gap,
    overflow: "hidden",
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    lineHeight: 1,
    color: textColor,
    fontWeight: fontWeight,
  };

  const gradientContainerStyle = {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

 
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = Math.floor(progress * value);
      setDisplayValue(newValue);

      if (progress < 1) {
        frame = requestAnimationFrame(updateCounter);
      }
    };

    frame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div style={{ ...defaultContainerStyle, ...containerStyle }}>
      <div style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={displayValue}
            height={height}
            digitStyle={digitStyle}
          />
        ))}
      </div>
      <div style={gradientContainerStyle}>
        <div
          style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}
        />
        <div
          style={
            bottomGradientStyle
              ? bottomGradientStyle
              : defaultBottomGradientStyle
          }
        />
      </div>
    </div>
  );
}


