"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useStore from "@/app/store/zustand/store";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const { addDetectedText } = useStore();

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const analyzeImage = async (base64Image) => {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Failed to analyze image");
    }
  };

  const analyzeAndSave = async (blob) => {
    const getWidth = (boundingBox) =>
      boundingBox?.vertices?.[1]?.x - boundingBox?.vertices?.[0]?.x || 0;
    const getHeight = (boundingBox) =>
      boundingBox?.vertices?.[2]?.y - boundingBox?.vertices?.[0]?.y || 0;
    const getArea = (boundingBox) =>
      getWidth(boundingBox) * getHeight(boundingBox);

    try {
      setLoading(true);
      const base64Image = await convertBlobToBase64(blob);
      const analysisResult = await analyzeImage(base64Image);

      if (!analysisResult?.responses?.[0]?.fullTextAnnotation) {
        console.log("No text detected or invalid API response.");
        addDetectedText(uuidv4(), []);
        return;
      }

      const analyzedData = [];
      const priceCandidateList = [];

      analysisResult.responses[0].fullTextAnnotation.pages?.forEach((page) => {
        page.blocks?.forEach((block) => {
          block.paragraphs?.forEach((paragraph) => {
            const text =
              paragraph.words
                ?.map((word) =>
                  word.symbols?.map((symbol) => symbol.text).join("")
                )
                .join(" ") || "";
            const boundingBox = paragraph.boundingBox;
            const area = getArea(boundingBox);
            const width = getWidth(boundingBox);

            analyzedData.push({ text, boundingBox, area, width });

            const isPriceFormat = /\d{1,3}(?:,?\d{3})*/g.test(text);
            const hasNonNumericChars = /[^0-9,]/g.test(text);

            if (isPriceFormat && !hasNonNumericChars) {
              priceCandidateList.push({ text, boundingBox, area });
            }
            
      // console.log("Final priceCandidateList3:", priceCandidateList);
          });
        });
      });
      //상품명


      analyzedData.sort((a, b) => b.width - a.width);

      console.log("Final priceCandidateList1:", priceCandidateList);

      // productName 개수
      const productNameCandidateList = analyzedData
        .slice(0, 4)
        .map(({ text, boundingBox, width }) => ({ text, boundingBox, width }));

      //   console.log("Final priceCandidateList2:", priceCandidateList);
      // console.log("productNameCandidateList:", productNameCandidateList);
      // console.log("priceCandidateList:", priceCandidateList);

      const id = uuidv4();
      addDetectedText(
        id,
        analyzedData,
        productNameCandidateList,
        priceCandidateList
      );
      // console.log("Final priceCandidateList:", priceCandidateList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, analyzeAndSave };
}

export default useImageAnalysis;
