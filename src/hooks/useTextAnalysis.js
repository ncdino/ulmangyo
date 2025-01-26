"use client";
import { useState } from "react";
import useStore from "@/app/store/zustand/store";

const useTextAnalysis = () => {
  const { addDetectedText } = useStore();
  const [analyzing, setAnalyzing] = useState(false);

  const getWidth = (boundingBox) =>
    boundingBox?.vertices?.[1]?.x - boundingBox?.vertices?.[0]?.x || 0;
  const getHeight = (boundingBox) =>
    boundingBox?.vertices?.[2]?.y - boundingBox?.vertices?.[0]?.y || 0;
  const getArea = (boundingBox) =>
    getWidth(boundingBox) * getHeight(boundingBox);

  const analyzeTextData = async (textData) => {
    setAnalyzing(true); 
    try {
      console.log("API Response (textData):", textData);

      if (
        !textData ||
        !textData.responses ||
        !textData.responses[0]?.fullTextAnnotation
      ) {
        console.log("No text detected or invalid API response.");
        addDetectedText(crypto.randomUUID(), []);
        setAnalyzing(false);
        return;
      }

      const fullTextAnnotation = textData.responses[0].fullTextAnnotation;
      const analyzedData = {};

      fullTextAnnotation.pages?.forEach((page, pageIndex) => {
        page.blocks?.forEach((block) => {
          block.paragraphs?.forEach((paragraph, paragraphIndex) => {
            const text =
              paragraph.words
                ?.map((word) =>
                  word.symbols?.map((symbol) => symbol.text).join("")
                )
                .join(" ") || "";
            const boundingBox = paragraph.boundingBox;
            const area = getArea(boundingBox);
            analyzedData[`paragraph${paragraphIndex}`] = {
              text,
              boundingBox,
              area,
            };
          });
        });
      });

      console.log("analyzedData", analyzedData);
      addDetectedText(crypto.randomUUID(), analyzedData);
    } catch (error) {
      console.error("Error during text analysis:", error);
      addDetectedText(crypto.randomUUID(), {});
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzeTextData, analyzing, setAnalyzing };
};

export default useTextAnalysis;
