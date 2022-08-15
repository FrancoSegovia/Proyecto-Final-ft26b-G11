import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../../../redux/actions/index.js";

import UserCard from "../../features/UserCard/UserCard";
import Navbar from "../../features/UserNavbar/UserNavbar.jsx";
import UserShopOrder from "../../features/UserShopOrder/UserShopOrder.jsx";
import UserShopFilter from "../../features/UserShopFilter/UserShopFilter.jsx";
import ShoppingCart from "../../features/UserShoppingCart/ShoppingCart"

import { Grid } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getAllShops());
  }, []);

  const shopss = [
    {
      image:null,
      name:"Ñamfifruli",
      category:"Restaurant",
      products:[
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        },
        {
          image:null,
          name:"Papafrula",
          price:"500",
        }
      ]
    },
    {
      image:null,
      name:"Oktubre",
      category:"Heladeria",
      products:[
        {
          image:null,
          name:"Helado de vainilla",
          price:"500",
        }
      ]
    },
    {
      image:null,
      name:"Luzbelito",
      category:"Bodegón",
      products:[
        {
          image:null,
          name:"Milanesa con puré",
          price:"500",
        }
      ]
    },
    {
      image:null,
      name:"Pizza Conmigo",
      category:"Pizzeria",
      products:[
        {
          image:null,
          name:"Especial Kito Pizza",
          price:"500",
        }
      ]
    }
    ,
    {
      image:null,
      name:"El Paseo Familiar de Don José",
      category:"Bodegón",
      products:[
        {
          image:null,
          name:"Papito jugó al Doom",
          price:"250",
        }
      ]
    }
  ]

  // console.log(shopss)
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "75px", backgroundColor: "white" }}>
        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ marginBottom: "20px", padding: "35px 0px" }}
        >
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <UserShopOrder />
            <UserShopFilter />
          </Grid>

          <Grid
            container
            justifyContent="space-evenly"
            xs={7}
            style={{ textAlign: "center" }}
          >
            {error || !shops.length ? (
              <p
                style={{
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                No pudimos encontrar el Negocio solicitado.
              </p>
            ) : (
              shops.map((shop) => {
                return (
                  <div key={shop._id}>
                    <UserCard shop={shop} />{" "}
                  </div>
                );
              })
            )}
          </Grid>

          <Grid item xs={2} style={{ textAlign: "center" }}>
            <ShoppingCart />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
