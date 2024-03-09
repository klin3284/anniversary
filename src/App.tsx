"use client";
import { useState } from "react";
import Modal from "react-modal";
import Box from "@mui/material/Box";
import anjuImage from "/anju.jpeg?url";
import fujiImage from "/fuji.jpeg?url";
import gyukakuImage from "/gyukaku.jpeg?url";
import hortusImage from "/hortus.jpeg?url";
import revival1Image from "/revival1.jpeg?url";
import revival2Image from "/revival2.jpeg?url";
import sugidamaImage from "/sugidama.jpeg?url";
import vallaImage from "/valla.jpeg?url";
import yvonnes1Image from "/yvonnes1.jpeg?url";
import yvonnes2Image from "/yvonnes2.jpeg?url";
import cakeImage from "/cake.png?url";

// This line is important to bind the modal to your appElement
Modal.setAppElement("#root");

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [disclaimer, displayDisclaimer] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  type AnniversaryDate = {
    name: string;
    month: number;
    images: string[];
  };

  const anniversaryDate: AnniversaryDate[] = [
    { name: "Fuji", month: 0, images: [fujiImage] },
    { name: "Hortus", month: 1, images: [hortusImage] },
    { name: "Yvonnes", month: 2, images: [yvonnes1Image, yvonnes2Image] },
    {
      name: "NH + Revival",
      month: 3,
      images: [revival1Image, revival2Image],
    },
    { name: "Thai Valla", month: 4, images: [vallaImage] },
    {
      name: "GyuKaku + Sugidama",
      month: 5,
      images: [sugidamaImage, gyukakuImage],
    },
    { name: "Anju", month: 6, images: [anjuImage] },
  ];

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "With a chocolate rice cake on top",
      "What about a matcha frostie",
      "PLEASE POOKIE",
      "Okay you can press yes now",
      "Press yes!",
      "I love you! Press yes!",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  function getMonthName(monthNumber: number) {
    const date = new Date(2020, monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  }

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="my-4 text-4xl font-bold">
            Oh yeah! Oh yeah! I love you peanut!!
          </div>
          <Box
            component="img"
            src={cakeImage}
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              padding: "5px",
            }}
          />
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          />
          <h1 className="my-4 text-4xl">Do you love me?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() =>
                noCount < 6 ? displayDisclaimer(true) : setYesPressed(true)
              }
            >
              Yes
            </button>
            <Modal
              isOpen={disclaimer}
              onRequestClose={() => displayDisclaimer(false)}
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "lightblue",
                },
              }}
            >
              <h4>I spent time on this. Can you press no til later</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => displayDisclaimer(false)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "lightcoral",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  Close
                </button>
              </div>
            </Modal>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      {!yesPressed && noCount > 0 && noCount < 7 ? (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ fontSize: 24 }}>
            Do you remember {anniversaryDate[noCount - 1].name}
          </h2>
          <p>
            {" "}
            Anni {anniversaryDate[noCount - 1].month} in{" "}
            {getMonthName(anniversaryDate[noCount - 1].month + (9 % 12))}
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {anniversaryDate[noCount - 1].images.map((image) => (
              <Box
                component="img"
                src={image}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  padding: "5px",
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
