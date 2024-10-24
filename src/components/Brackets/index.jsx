import React, { useMemo } from "react";
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import MFMap from "../../constants/bracket_maps/MF.draw.json";
import { touchMap } from "../../utils/processBracket";
const nameToMapItem = touchMap(MFMap.children);

const playData = [
  {
    "id": "3j3kVICj6Idmb7nzH5wu",
    "Gameid": "15",
    "Type": "C",
    "Gender": "W",
    "Date": "4/25/24",
    "isActive": true,
    "Location": "BLA",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Nextgame": "31",
    "order": "TeamA"
  },
  {
    "id": "4DoJpIrV2DLlQnMoLgCj",
    "TeamB": "Mater",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Gameid": "25",
    "Date": "4/25/24",
    "Type": "C",
    "Gender": "W",
    "Location": "BLA",
    "Nextgame": "28",
    "isActive": true,
    "order": "TeamB"
  },
  {
    "id": "4VjsEMrqc57r3Q19YiJn",
    "Gender": "W",
    "Type": "C",
    "isActive": true,
    "createdDate": "2024-10-24T17:57:03.363Z",
    "Location": "BLA",
    "Date": "4/26/24",
    "Gameid": "31"
  },
  {
    "id": "6UZ1J8N9hVLgMO1Px16s",
    "TeamA": "Mater",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "order": "TeamB",
    "Date": "4/25/24",
    "Nextgame": "25",
    "Location": "BLA",
    "Set2": "25-10",
    "isActive": true,
    "Set3": "",
    "TeamB": "ADC",
    "Set1": "25-16",
    "Gender": "W",
    "Type": "C",
    "Gameid": "19"
  },
  {
    "id": "ABjVkrJZffyIWwnq4Or4",
    "TeamB": "CPN",
    "Gameid": "22",
    "isActive": true,
    "Type": "C",
    "Date": "4/25/24",
    "Set1": "",
    "TeamA": "Escaed",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Nextgame": "27",
    "order": "TeamA",
    "Gender": "W",
    "Location": "BLA"
  },
  {
    "id": "AW3EMLHusDI5hsbK1LhQ",
    "Gender": "W",
    "Type": "C",
    "Nextgame": "14",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA",
    "Date": "4/25/24",
    "order": "TeamB",
    "isActive": true,
    "Gameid": "12"
  },
  {
    "id": "D5nNfFKveZO03yP4k7oh",
    "isActive": true,
    "Type": "C",
    "Date": "4/25/24",
    "Gender": "W",
    "order": "TeamA",
    "Gameid": "28",
    "Nextgame": "30",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Location": "BLA"
  },
  {
    "id": "D8BH75hY1eeRC12ptyVN",
    "order": "TeamA",
    "Gameid": "24",
    "Date": "4/25/24",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA",
    "Nextgame": "28",
    "Gender": "W",
    "Type": "C",
    "isActive": true
  },
  {
    "id": "EfuIVN8KrSLmS0KhXw7e",
    "Type": "C",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Date": "4/25/24",
    "Gameid": "27",
    "Gender": "W",
    "order": "TeamB",
    "Location": "BLA",
    "isActive": true,
    "Nextgame": "29"
  },
  {
    "id": "EtwDsSMT8Nb3rNC3eBYl",
    "Gender": "W",
    "Nextgame": "10",
    "isActive": true,
    "TeamB": "API",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "TeamA": "Presby - Carolina",
    "Location": "BLA",
    "Gameid": "3",
    "Date": "4/25/24",
    "Type": "C",
    "order": "TeamA"
  },
  {
    "id": "Fta53QPrjQdHky9Kggw6",
    "Gameid": "11",
    "Date": "4/25/24",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Nextgame": "14",
    "isActive": true,
    "Location": "BLA",
    "Gender": "W",
    "order": "TeamA",
    "Type": "C"
  },
  {
    "id": "Hw6FuaSlPbaLfvVtV8Er",
    "order": "TeamA",
    "Date": "4/25/24",
    "Nextgame": "13",
    "Gameid": "9",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA",
    "isActive": true,
    "Gender": "W",
    "Type": "C"
  },
  {
    "id": "IaGehwlAGq6vVSIslA56",
    "isActive": true,
    "Location": "BLA",
    "Date": "4/25/24",
    "Nextgame": "26",
    "order": "TeamB",
    "Gender": "W",
    "Gameid": "21",
    "TeamA": "Masis",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "TeamB": "Del Carmen - Hatillo",
    "Type": "C"
  },
  {
    "id": "KjwTQgdyyUvpFz1iPye9",
    "Nextgame": "27",
    "Type": "C",
    "order": "TeamB",
    "isActive": true,
    "TeamB": "LCA",
    "Gender": "W",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Date": "4/25/24",
    "TeamA": "Shaddai",
    "Gameid": "23",
    "Location": "BLA"
  },
  {
    "id": "MkbdV04Z1ORsQT17X9Ps",
    "TeamA": "La Salle",
    "Nextgame": "12",
    "isActive": true,
    "order": "TeamA",
    "Gameid": "7",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "TeamB": "BMA",
    "Type": "C",
    "Location": "BLA",
    "Gender": "W",
    "Date": "4/25/24"
  },
  {
    "id": "PF8yKTcpjEw7wDBF9ly8",
    "Type": "C",
    "TeamA": "Wesleyan",
    "isActive": true,
    "TeamB": "Adianez",
    "order": "TeamB",
    "Date": "4/25/24",
    "Nextgame": "24",
    "Gameid": "17",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA",
    "Gender": "W"
  },
  {
    "id": "TxuTr2B8Wl5XKvbRwx1l",
    "Gameid": "30",
    "isActive": true,
    "Date": "4/25/24",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Location": "BLA",
    "Type": "C",
    "Gender": "W",
    "Nextgame": "31",
    "order": "TeamB"
  },
  {
    "id": "VpMZc0zpZUyRGgm7ST4h",
    "Gameid": "18",
    "order": "TeamA",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Date": "4/25/24",
    "Nextgame": "25",
    "TeamB": "Menonita",
    "Location": "BLA",
    "Gender": "W",
    "TeamA": "Kingdom - Dorado",
    "isActive": true,
    "Type": "C"
  },
  {
    "id": "bPlnFAGQpx4CPG0kx3uD",
    "TeamA": "BBS",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Date": "4/25/24",
    "Location": "BLA",
    "Type": "C",
    "TeamB": "Ponceño",
    "Nextgame": "12",
    "Gender": "W",
    "order": "TeamB",
    "isActive": true,
    "Gameid": "8"
  },
  {
    "id": "ejusTDilksmo8csAtMYy",
    "Type": "C",
    "order": "TeamB",
    "Date": "4/25/24",
    "isActive": true,
    "Nextgame": "13",
    "Gender": "W",
    "Gameid": "10",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA"
  },
  {
    "id": "hBJLUV4lEkG7WDmCQzka",
    "Type": "C",
    "Date": "4/25/24",
    "Gameid": "6",
    "order": "TeamB",
    "isActive": true,
    "createdDate": "2024-10-22T09:06:07.949Z",
    "TeamB": "Tasis",
    "Nextgame": "11",
    "Location": "BLA",
    "Gender": "W",
    "TeamA": "Piaget"
  },
  {
    "id": "ha7xSpyQtjbSgs9WBEfb",
    "order": "TeamB",
    "isActive": true,
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Gender": "W",
    "Nextgame": "10",
    "Date": "4/25/24",
    "Location": "BLA",
    "Gameid": "4",
    "Type": "C",
    "TeamB": "Family Christian",
    "TeamA": "Perpetuo"
  },
  {
    "id": "ij9vrHEHinBidjt21sah",
    "Location": "BLA",
    "Gender": "W",
    "Gameid": "16",
    "Type": "C",
    "isActive": true,
    "TeamA": "Walks Webbs",
    "Date": "4/25/24",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "order": "TeamA",
    "TeamB": "Notre Dame",
    "Nextgame": "24"
  },
  {
    "id": "njwdvgggU1b2K9rRFBac",
    "isActive": true,
    "Gender": "W",
    "Gameid": "13",
    "Type": "C",
    "Nextgame": "15",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "order": "TeamA",
    "Date": "4/25/24",
    "Location": "BLA"
  },
  {
    "id": "qneDzAGfv4TiqXuRCvAa",
    "Gameid": "5",
    "TeamA": "IDN",
    "Nextgame": "11",
    "Type": "C",
    "Location": "BLA",
    "Gender": "W",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Date": "4/25/24",
    "TeamB": "Santa María",
    "isActive": true,
    "order": "TeamA"
  },
  {
    "id": "rl1RHAI1vd7BlKxqFbAe",
    "Nextgame": "9",
    "Gameid": "2",
    "TeamB": "Marista - Guaynabo",
    "Date": "4/25/24",
    "order": "TeamB",
    "TeamA": "San Felipe",
    "Gender": "W",
    "Type": "C",
    "isActive": true,
    "createdDate": "2024-10-22T09:06:07.949Z",
    "Location": "BLA"
  },
  {
    "id": "teNuOnhJZkxD8Xst2y3H",
    "Gameid": "14",
    "Location": "BLA",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "isActive": true,
    "Date": "4/25/24",
    "Nextgame": "15",
    "Type": "C",
    "order": "TeamB",
    "Gender": "W"
  },
  {
    "id": "u5eqALMXj6hYzfdx3qkq",
    "isActive": true,
    "Date": "4/25/24",
    "Gender": "W",
    "order": "TeamA",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Nextgame": "29",
    "Gameid": "26",
    "Type": "C",
    "Location": "BLA"
  },
  {
    "id": "usKPFwPasNl3ztUt3AoP",
    "Location": "BLA",
    "Gender": "W",
    "createdDate": "2024-10-22T09:06:07.950Z",
    "Date": "4/25/24",
    "Nextgame": "30",
    "Type": "C",
    "isActive": true,
    "order": "TeamB",
    "Gameid": "29"
  },
  {
    "id": "wIN7BQr8W3RJ3blmaf4D",
    "createdDate": "2024-10-22T09:06:07.948Z",
    "TeamB": "ALESPI",
    "Type": "C",
    "order": "TeamA",
    "Nextgame": "9",
    "Gender": "W",
    "Date": "4/25/24",
    "Gameid": "1",
    "TeamA": "SFS",
    "isActive": true,
    "Location": "BLA"
  },
  {
    "id": "xb483Tctc7CRc770K8M6",
    "createdDate": "2024-10-22T09:06:07.949Z",
    "TeamA": "Inmaculada - Manatí",
    "TeamB": "Sagrado - Ponce",
    "Date": "4/25/24",
    "Gameid": "20",
    "Location": "BLA",
    "Nextgame": "26",
    "isActive": true,
    "Gender": "W",
    "Type": "C",
    "order": "TeamA"
  }
]


export const Brackets = () => {
  const map = useMemo(() => {
    const map = MFMap.children.map(it => {
      if (it.type === "RECTANGLE")
        delete it.content;
      return it;
    });

    playData.map((record) => {
      if (record.TeamA) {
        const item = nameToMapItem[record.Gameid + ".up.text"];
        if (item)
          item.content = record.TeamA;
      }
      if (record.TeamB) {
        const item = nameToMapItem[record.Gameid + ".down.text"];
        if (item)
          item.content = record.TeamB;
      }
      if (record.Location) {
        const item = nameToMapItem[record.Gameid + ".mid.text"];
        if (item)
          item.content = `${record.Location}\n${record.Date}`;
      }
    })

    return map;
  }, [playData])

  return (
    <div className="flex w-full h-full items-center justify-center overflow-auto">
      <Stage width={MFMap.width} height={MFMap.height}>
        <Layer>
          {
            map.map(item => {
              if (item.type === "LINE") {
                return <Line key={item.id} points={[item.stx, item.sty, item.edx, item.edy]} stroke="black" />
              }
              if (item.type === "RECTANGLE") {
                if (item.content) {
                  console.log(item);

                  return <Text
                    key={item.id}
                    x={item.x}
                    y={item.y}
                    width={item.width}
                    height={item.height}
                    align="center"
                    verticalAlign={item.touchedName.includes("up") ? "bottom" : (item.touchedName.includes("down") ? "up" : "middle")}
                    fontStyle="bold"
                    text={item.content}
                    fontSize={12}
                  />
                }
                // return <Rect
                //   x={item.x}
                //   y={item.y}
                //   width={item.width}
                //   height={item.height}
                //   stroke="gray"
                // />
              }
            })
          }
          {
            nameToMapItem["winner.label"] && <Text
              x={nameToMapItem["winner.label"].x}
              y={nameToMapItem["winner.label"].y}
              width={nameToMapItem["winner.label"].width}
              height={nameToMapItem["winner.label"].height}
              align="center"
              verticalAlign="middle"
              fontStyle="bold"
              text={"Winner"}
              fontSize={20}
            />
          }
          {/* {texts.map(([sx, sy, ex, ey, text], i) => (
            <Text
              key={i}
              x={sx}
              y={sy}
              width={ex - sx}
              height={ey - sy}
              align="center"
              verticalAlign="middle"
              fontStyle="bold"
              text={text}
              fontSize={20}
            />
          ))}

          {lines.map((line, i) => (
            <Line key={i} points={line} stroke="black" />
          ))} */}
        </Layer>
      </Stage>
    </div>
  );
};
